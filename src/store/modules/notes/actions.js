import axios from 'axios'
import { openDB } from "idb";
import { Dialog, Notify } from "quasar"
import { i18n } from '../../../boot/i18n'
import authHeader from '../../../services/auth-header'

export default {
  resetNoteState({ commit }) {
    commit("resetNoteState");
  },

/*
  Notes: Read Actions
*/

  async getNotesInit({ commit, state, dispatch }) {
    commit("setLoadingNotes", true);
    commit("pageInit");
    commit("setPageNumber");
    commit("emptyNotes");

    let page = state.page;
    try {
      const response = await axios.get(
        `${process.env.API}/notes?sortBy=createdAt:desc&per_page=10&page=${page}`,
        { headers: authHeader() }
      );
      response.data.notes.forEach(note => {
        let timeInData = note.createdAt;
        note.createdAt = new Date(timeInData);
      });
      const notes = response.data.notes;
      const totalNotes = response.data.totalNotes;

      commit("setLoadingNotes", false);
      commit("setTotalNotes", totalNotes);
      commit("setNotes", notes);
    } catch (err) {
      console.error("error in post");
      if (err.response.status === 401) {
        await dispatch("auth/forcedLogout", null, { root: true });
        this.$router.replace({ path: "/auth/login" });
        Dialog.create({
          title: "Error",
          message:
            "You are either unauthenticated or no longer authenticated for some reasons. Please login again."
        });
      } else {
        commit("setLoadingNotes", false);
        Dialog.create({
          title: "Error",
          message: "Could not download your notes..."
        });
      }
    }
  },

  async loadMoreNotes({ commit, state }) {
    let totalPages = Math.floor(state.totalNotes / 10) + 1;
    if (state.page < totalPages) {
      commit("setPageNumber");
    }
    let page = state.page;
    try {
      const response = await axios.get(
        `${process.env.API}/notes?sortBy=createdAt:desc&per_page=10&page=${page}`,
        { headers: authHeader() }
      );

      response.data.notes.forEach(note => {
        let timeInData = note.createdAt;
        note.createdAt = new Date(timeInData);
      });
      const notes = response.data.notes;
      const totalNotes = response.data.totalNotes;

      commit("setTotalNotes", totalNotes);
      commit("setNotes", notes);
    } catch (err) {
      console.error(err.response.status);
      Dialog.create({
        title: "Error",
        message: "Could not download your notes..."
      });
    }
  },

  async getFiveNewestNotes({ commit }) {
    try {
      const response = await axios.get(
        `${process.env.API}/notes?sortBy=createdAt:desc&per_page=5`,
        { headers: authHeader() }
      );
      const notes = response.data.notes;

      commit("setFiveNewestNotes", notes);
    } catch (err) {
      Dialog.create({
        title: "Error",
        message: "Could not download your notes..."
      });
    }
  },

  async getCalendarInfo({ commit }) {
    try {
      const response = await axios.get(
        `${process.env.API}/calendar?sortBy=createdAt:desc&per_page=100`,
        { headers: authHeader() }
      );
      response.data.info.forEach(info => {
        let timeInData = info.createdAt;
        info.createdAt = new Date(timeInData);
      });

      const info = response.data.info;
      commit("setCalendarInfo", info);
    } catch (err) {
      Dialog.create({
        title: "Error",
        message: "Could not download your calendar info..."
      });
    }
  },

  async getSingleNote({ commit }, _id) {
    try {
      const response = await axios.get(`${process.env.API}/notes/${_id}`, {
        headers: authHeader()
      });

      const note = response.data.note;
      commit("setSingleNote", note);
    } catch (err) {
      Dialog.create({
        title: "Error",
        message: "Could not download your note..."
      });
    }
  },

  /*
  Notes: Create, Update, Delete actions
*/

  async addNote({ commit, dispatch, rootState }, note) {
    const lang = i18n.locale
    const newNoteData = {
      ...note,
      lang
    }
    try {
      const response = await axios.post(
        `${process.env.API}/notes`,
        newNoteData,
        { headers: authHeader() }
      );
      console.log(response.data);
      const createdNote = response.data.note;
      createdNote.createdAt = new Date(createdNote.createdAt);

      commit("addNote", createdNote)
      dispatch("getCalendarInfo")

      if (response.data.congratsLetter) {
        dispatch("notifications/getTotalNotificationsUnconfirmed", null, { root: true })
      }
      await Notify.create({
        message: "Note Added!",
        timeout: 2000,
        actions: [{ label: "Close", color: "white" }]
      })
    } catch (err) {
      console.error(err);
      if (!navigator.onLine && rootState.system.backgroundSyncSupported) {
        newNoteData.owner = rootState.auth.user.user.name;
        newNoteData.createdAt = Date.now();
        newNoteData.offline = true;

        commit("addNote", newNoteData);
        Notify.create({
          message: "Note created offline"
        });
      } else {
        Dialog.create({
          title: "Error",
          message: "Could not add a new note..."
        });
      }
    }
  },

  async updateNote({ commit, rootState }, updates) {
    const noteId = updates._id;
    const updatingNote = updates.updates;

    try {
      const response = await axios.patch(
        `${process.env.API}/notes/${noteId}`,
        updatingNote,
        { headers: authHeader() }
      );

      const updatedNote = response.data.note;
      updatedNote.createdAt = new Date(updatedNote.createdAt);

      await Notify.create({
        message: "Note Updated!",
        timeout: 2000,
        actions: [{ label: "Close", color: "white" }]
      });

      commit("updateNote", updatedNote);
    } catch (err) {
      if (!navigator.onLine && rootState.system.backgroundSyncSupported) {
        commit("updateNoteOffline", updatingNote);
        Notify.create({
          message: "Note updated offline"
        });
      } else {
        Dialog.create({
          title: "Error",
          message: "Could not update the note..."
        });
      }
    }
  },

  async deleteNote({ commit, dispatch, rootState }, _id) {
    const noteId = _id;
    try {
      await axios.delete(`${process.env.API}/notes/${noteId}`, {
        headers: authHeader()
      });

      commit("deleteNote", _id);
      dispatch("getCalendarInfo");

      await Notify.create({
        message: "Note deleted!",
        timeout: 2000,
        actions: [{ label: "Close", color: "white" }]
      });
    } catch (err) {
      if (!navigator.onLine && rootState.system.backgroundSyncSupported) {
        commit("deleteNoteOffline", _id);
        Notify.create({
          message: "Note deleted offline"
        });
      } else {
        Dialog.create({
          title: "Error",
          message: "Could not delete the note..."
        });
      }
    }
  },

/*
  Note Images related actions
*/

  async addImage({ commit, dispatch, rootState }, note) {
    const noteId = note._id;

    let formData = new FormData();
    formData.append("_id", note.updates._id);
    formData.append("file", note.updates.photo, note.updates._id + ".png");

    try {
      const response = await axios.post(
        `${process.env.API}/notes/${noteId}`,
        formData,
        { headers: authHeader() }
      );

      const updatedNote = response.data.note;

      await Notify.create({
        message: "Image added!",
        timeout: 2000,
        actions: [{ label: "Close", color: "white" }]
      });

      commit("updateNote", updatedNote);
    } catch (err) {
      if (!navigator.onLine && rootState.system.backgroundSyncSupported) {
        dispatch("getOfflineImage");
        Notify.create({
          message: "Image added offline"
        });
      } else {
        Dialog.create({
          title: "Error",
          message: "Could not add an image..."
        });
      }
    }
  },

  async deleteImage({ commit, rootState }, _id) {
    const noteId = _id;

    try {
      const response = await axios.delete(
        `${process.env.API}/notes/photo/${noteId}`,
        { headers: authHeader() }
      );

      const updatedNote = {
        ...response.data.note
      };

      await Notify.create({
        message: "Image Deleted!!",
        timeout: 2000,
        actions: [{ label: "Close", color: "white" }]
      });

      commit("updateNote", updatedNote);
    } catch (err) {
      if (!navigator.onLine && rootState.system.backgroundSyncSupported) {
        commit("deleteImageOffline", _id);
        Notify.create({
          message: "Image deleted offline"
        });
      } else {
        Dialog.create({
          title: "Error",
          message: "Could not delete the image..."
        })
      }
    }
  },

  /*
  Background Sync: Offline related actions
*/
  getOfflineSingleNote({ commit }, _id) {
    commit("setOfflineSingleNote", _id);
  },

  getOfflineImage({ commit }, _id) {
    let db = openDB("workbox-background-sync").then(db => {
      db.getAll("requests")
        .then(failedRequests => {
          failedRequests.forEach(failedRequest => {
            if (failedRequest.queueName === "createNoteQueue") {
              let request = new Request(
                failedRequest.requestData.url,
                failedRequest.requestData
              );
              request.formData().then(formData => {
                let offlineNote = {};
                offlineNote._id = formData.get("_id");

                let reader = new FileReader();
                reader.readAsDataURL(formData.get("file"));
                reader.onloadend = () => {
                  offlineNote.photo = reader.result;
                  commit("updateNoteOffline", offlineNote);
                };
              });
            }
          });
        })
        .catch(err => {
          console.error("Error accessing IndexedDB: ", err);
        });
    });
  },

  changeOfflineStatus({ commit }, url) {
    commit("resetOfflineNote");
    commit("resetOfflineUpdateStatus", url);
  }
};
