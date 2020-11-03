import axios from 'axios'
import { Dialog, Notify } from "quasar"
import authHeader from '../../../services/auth-header'

export default {
  resetNoteState({ commit }) {
    console.log('resetNoteState triggered in actions');
    commit('resetNoteState')
  },

  async getNotes({ commit }) {
    commit("setLoadingNotes", true);
    try {
      const response = await axios.get(`${process.env.API}/notes`, { headers: authHeader() });
      const notes = response.data.notes;

      commit("setLoadingNotes", false);
      commit("setNotes", notes);
    } catch (err) {
      commit("setLoadingNotes", false);
      Dialog.create({
        title: "Error",
        message: "Could not download your notes..."
      })
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

  async addNote({ commit }, note) {
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

      newNoteData._id = response.data.note._id;
      newNoteData.owner = response.data.note.owner;
      newNoteData.createdAt = response.data.note.createdAt;
      commit("addNote", newNoteData);

      await Notify.create({
        message: "Note Added!",
        timeout: 2000,
        actions: [{ label: "Close", color: "white" }]
      })
    } catch (err) {
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

      const updatedNote = {
        ...response.data.note
      };

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

  async deleteNote({ commit }, _id) {
    const noteId = _id;

    try {
      await axios.delete(
        `${process.env.API}/notes/${noteId}`,
        { headers: authHeader() }
      );

      commit("deleteTask", _id);
    } catch (err) {
      Dialog.create({
        title: "Error",
        message: "Could not delete the note..."
      });
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
