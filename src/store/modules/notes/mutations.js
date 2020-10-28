export default {
  addNote(state, payload) {
    state.notes.push(payload);
  },

  setNotes(state, notes) {
    state.notes = notes;
  },

  setSingleNote(state, resData) {
    state.singleNote = resData;
  },

  updateNote(state, updatedNote) {
    const updatingNote = state.notes.find(note => note._id === updatedNote._id);
    Object.assign(updatingNote, updatedNote);

    Object.assign(state.singleNote, updatedNote);
  },

  deleteTask(state, _id) {
    state.notes = state.notes.filter(note => {
      return note._id !== _id;
    });
  },

  setLoadingNotes(state, isLoading) {
    state.loadingNotes = isLoading
  }

  // setNotesDownloaded(state, value) {
  //   state.NotesDownloaded = value;
  // }
};
