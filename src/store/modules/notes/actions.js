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

  async updateNote({ commit }, note) {
    const noteId = note._id;
    console.log(note._id);
    const formData = new FormData();
    formData.append('_id', note.updates._id);
    formData.append('title', note.updates.title);
    formData.append('author', note.updates.author);
    formData.append('category', note.updates.category);
    formData.append('pageFrom', note.updates.pageFrom);
    formData.append('pageTo', note.updates.pageTo);
    formData.append('comment', note.updates.comment);

    const response = await axios.patch(`${process.env.API}/notes/${noteId}`, formData)

    if (response.status !== 200) {
      const error = new Error(response.message || 'Editing a note failed...');
      throw error
    }

    const resData = await response;

    const updatedNote = {
      //_id: resData.data.note._id,
      title: resData.data.note.title,
      author: resData.data.note.author,
      category: resData.data.note.category,
      pageFrom: resData.data.note.pageFrom,
      pageTo: resData.data.note.pageTo,
      comment: resData.data.note.comment,
      //owner: resData.data.note.owner,
      createdAt: resData.data.note.createdAt
    };

    const payload = {
      updatedNote,
      _id: noteId
    }

    commit("updateNote", payload);
  },

  async deleteNote({ commit }, _id) {
    const noteId = _id;
    const response = await axios.delete(`${process.env.API}/notes/${noteId}`);

    if (!response.status === 200) {
      const error = new Error(response.message || "Failed to send request.");
      throw error;
    }

    commit("deleteTask", _id);
  }
};
