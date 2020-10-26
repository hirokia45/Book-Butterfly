import axios from 'axios'

export default {
  async getNotes({ commit }) {
    const response = await axios.get(`${process.env.API}/notes`);
    const notes = response.data.notes;

    if (!response.status === 200) {
      const error = new Error(response.message || "Failed to fetch...");
      throw error;
    }

    commit("setNotes", notes);
  },

    async getSingleNote({ commit }, _id) {

    const response = await axios.get(`${process.env.API}/notes/${_id}`)

    const resData = {
      _id: response.data.note._id,
      owner: response.data.note.owner,
      createdAt: response.data.note.createdAt,
      title: response.data.note.title,
      author: response.data.note.author,
      category: response.data.note.category,
      pageFrom: response.data.note.pageFrom,
      pageTo: response.data.note.pageTo,
      comment: response.data.note.comment,
      photo: response.data.note.photo
    }

    if (!response.status === 200) {
      const error = new Error(response.message || "Failed to fetch...");
      throw error;
    }
    commit('setSingleNote', resData)
  },

  async addNote({ commit }, note) {
    const userId = "Taro";
    const newNoteData = {
      title: note.title,
      author: note.author,
      category: note.category,
      pageFrom: note.pageFrom,
      pageTo: note.pageTo,
      comment: note.comment
    };

    const response = await axios.post(`${process.env.API}/notes`, newNoteData);

    if (!response.status === 201) {
      const error = new Error(response.message || "Failed to send request.");
      throw error;
    }

    newNoteData._id = response.data.note._id;
    newNoteData.owner = response.data.note.owner;
    newNoteData.createdAt = response.data.note.createdAt;
    commit("addNote", newNoteData);
  },

  async updateNote({ commit }, updates) {
    const noteId = updates._id
    const updatingNote = updates.updates

    const response = await axios.patch(`${process.env.API}/notes/${noteId}`, updatingNote)

    if (response.status !== 200) {
      const error = new Error(response.message || 'Editing a note failed...');
      throw error
    }

    const updatedNote = {
      ...response.data.note
    };

    commit("updateNote", updatedNote);
  },

  async updateImage({ commit }, note) {
    const noteId = note._id

    let formData = new FormData()
    formData.append('_id', note.updates._id)
    formData.append('file', note.updates.photo, note.updates._id + '.png')
    console.log(...formData.entries());

    const response = await axios.post(`${process.env.API}/notes/${noteId}`, formData)

    console.log('updateImageresposne: ', response)

    if (response.status !== 200) {
      const error = new Error(
        response.message || "Editing a note failed..."
      );
      throw error;
    }
  },

  async deleteNote({ commit }, _id) {
    const noteId = _id;
    const response = await axios.delete(`${process.env.API}/notes/${noteId}`);

    if (!response.status === 200) {
      const error = new Error(response.message || "Failed to send request.");
      throw error;
    }

    commit("deleteTask", _id);
  },

  async deleteImage({ commit }, _id) {
    const noteId = _id
    const response = await axios.delete(`${process.env.API}/notes/photo/${noteId}`)

    if (!response.status === 200) {
      const error = new Error(response.message || "Failed to send request.")
      throw error
    }

    const updatedNote = {
      ...response.data.note
    }

    commit('updateNote', updatedNote)
  }
};
