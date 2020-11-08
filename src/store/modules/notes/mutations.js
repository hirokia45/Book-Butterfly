const getDefaultNoteState = () => {
  return {
    notes: [],
    singleNote: {},
    loadingNotes: false
  }
}

export default {
  resetNoteState(state) {
    console.log('resetNoteState in mutations');
    Object.assign(state, getDefaultNoteState())
  },

  emptyNotes(state) {
    state.notes = []
  },

  pageInit(state) {
    state.page = null
  },

  // addNote(state, payload) {
  //   state.notes.unshift(payload);
  // },

  setNotes(state, notes) {
    state.notes = [...state.notes, ...notes]
  },

  setFiveNewestNotes(state, notes) {
    state.fiveNewestNotes = notes
  },

  setCalendarInfo(state, info) {
    state.calendarInfo = info
  },

  setPageNumber(state) {
    let totalPages = Math.floor(state.totalItems / 10) + 1
    if (state.page < totalPages) {
      state.page = state.page + 1
    }
    console.log('page after mutation, ', state.page);
  },

  setTotalItems(state, totalItems) {
    state.totalItems = totalItems;
  },

  setSingleNote(state, note) {
    state.singleNote = note;
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

};
