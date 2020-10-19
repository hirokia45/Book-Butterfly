import axios from 'axios'

export default {
  deleteNote({ commit }, id) {
    commit("deleteTask", id);
  },
  updateNote({ commit }, payload) {
    commit("updateNote", payload);
  },
  async getNotes({ commit }) {
    const response = await axios.get(`${process.env.API}/notes`);
    const notes = response.data.notes;

    if (!response.status === 200) {
      const error = new Error(response.message || "Failed to fetch...");
      throw error;
    }

    commit("getNotes", notes);
  },
  async addNote({ commit }, note) {
    const userId = 'Taro'
    let newNoteData = {
      title: note.title,
      author: note.author,
      category: note.category,
      pageFrom: note.pageFrom,
      pageTo: note.pageTo,
      comment: note.comment
    }

    const response = await axios.post(`${process.env.API}/notes`, newNoteData)

    if (!response.status === 201) {
      const error = new Error(response.message || 'Failed to send request.')
      throw error
    }

    newNoteData._id = response.data.note._id
    newNoteData.owner = response.data.note.owner
    newNoteData.createdAt = response.data.note.createdAt
    commit("addNote", newNoteData);
  }
};
