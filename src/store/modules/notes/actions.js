import axios from 'axios'
import { date, Dialog, Notify } from "quasar"
import authHeader from '../../../services/auth-header'

export default {
  resetNoteState({ commit }) {
    console.log('resetNoteState triggered in actions');
    commit('resetNoteState')
  },

  async getNotesInit({ commit, state, dispatch }) {
    commit("setLoadingNotes", true)
    commit("pageInit");
    commit("setPageNumber");
    commit("emptyNotes");

    let page = state.page
    try {
      const response = await axios.get(`${process.env.API}/notes?sortBy=createdAt:desc&per_page=10&page=${page}`, { headers: authHeader() })
      response.data.notes.forEach(note => {
        let timeInData = note.createdAt;
        note.createdAt = new Date(timeInData);
      })
      const notes = response.data.notes;
      const totalItems = response.data.totalItems;

      commit("setLoadingNotes", false);
      commit("setTotalItems", totalItems);
      commit("setNotes", notes);
    } catch (err) {
      //console.log(err.response.status);
      if (err.response.status === 401) {
        await dispatch("auth/forcedLogout", null, { root: true });
        this.$router.replace({ path: "/auth/login" })
        Dialog.create({
          title: "Error",
          message: "You are either unauthenticated or no longer authenticated for some reasons. Please login again."
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
    let totalPages = Math.floor(state.totalItems / 10) + 1;
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
      const totalItems = response.data.totalItems;

      commit("setTotalItems", totalItems);
      commit("setNotes", notes);
    } catch (err) {
      console.log(err.response.status);
      Dialog.create({
          title: "Error",
          message: "Could not download your notes..."
      })
    }
  },

  async getFiveNewestNotes({ commit }) {
    try {
      const response = await axios.get(
        `${process.env.API}/notes?sortBy=createdAt:desc&per_page=5`,
        { headers: authHeader() }
      )
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
      )
      response.data.info.forEach(info => {
        let timeInData = info.createdAt
        info.createdAt = new Date(timeInData)
      })

      const info = response.data.info
      commit("setCalendarInfo", info)
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

      const note = response.data.note
      commit("setSingleNote", note)
    } catch (err) {
      Dialog.create({
        title: "Error",
        message: "Could not download your note..."
      })
    }
  },

  async addNote({ commit, dispatch }, note) {
    const newNoteData = {
      title: note.title,
      author: note.author,
      category: note.category,
      pageFrom: note.pageFrom,
      pageTo: note.pageTo,
      comment: note.comment
    };

    try {
      const response = await axios.post(
        `${process.env.API}/notes`,
        newNoteData,
        { headers: authHeader() }
      );

      const createdNote = response.data.note
      createdNote.createdAt = new Date(createdNote.createdAt)

      commit("addNote", createdNote)
      await dispatch("getNotesInit")
      await Notify.create({
        message: "Note Added!",
        timeout: 2000,
        actions: [{ label: "Close", color: "white" }]
      })
    } catch (err) {
      console.error(err);
      Dialog.create({
        title: "Error",
        message: "Could not add a new note..."
      })
    }
  },

  async updateNote({ commit }, updates) {
    const noteId = updates._id
    const updatingNote = updates.updates

    try {
      const response = await axios.patch(
        `${process.env.API}/notes/${noteId}`,
        updatingNote,
        { headers: authHeader() }
      );

      const updatedNote = response.data.note
      updatedNote.createdAt = new Date(updatedNote.createdAt)

      await Notify.create({
        message: "Note Updated!",
        timeout: 2000,
        actions: [{ label: "Close", color: "white" }]
      });

      commit("updateNote", updatedNote);
    } catch (err) {
      Dialog.create({
        title: "Error",
        message: "Could not update the note..."
      });
    }

  },

  async addImage({ commit }, note) {
    const noteId = note._id

    let formData = new FormData()
    formData.append('_id', note.updates._id)
    formData.append('file', note.updates.photo, note.updates._id + '.png')

    console.log(...formData.entries());
    try {
      const response = await axios.post(
        `${process.env.API}/notes/${noteId}`,
        formData,
        { headers: authHeader() }
      );

      const updatedNote = response.data.note


      await Notify.create({
        message: "Image added!",
        timeout: 2000,
        actions: [{ label: "Close", color: "white" }]
      });

      commit("updateNote", updatedNote);
    } catch (err) {
      Dialog.create({
        title: "Error",
        message: "Could not add an image..."
      });
    }
  },

  async deleteNote({ commit, dispatch }, _id) {
    const noteId = _id;

    try {
      await axios.delete(
        `${process.env.API}/notes/${noteId}`,
        { headers: authHeader() }
      );

      commit("deleteNote", _id);
      await dispatch('updateNotesArray')
    } catch (err) {
      Dialog.create({
        title: "Error",
        message: "Could not delete the note..."
      })
    }
  },

  async updateNotesArray({ commit, state }) {
    try {
      let page = state.page
      const response = await axios.get(
        `${process.env.API}/notes/?sortBy=createdAt:desc&per_page=10&page=${page}`,
        { headers: authHeader() }
      );
      const notes = response.data.notes.forEach(note => {
        let timeInData = note.createdAt;
        note.createdAt = new Date(timeInData);
      })
      commit("setNotes", notes)
    } catch (err) {
      Dialog.create({
        title: "Error",
        message: "Could not reload the notes..."
      })
    }
  },

  async deleteImage({ commit }, _id) {
    const noteId = _id

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
      Dialog.create({
        title: "Error",
        message: "Could not delete the image..."
      });
    }

  }
};
