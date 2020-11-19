const getDefaultNoteState = () => {
  return {
    notes: [],
    singleNote: {},
    fiveNewestNotes: [],
    calendarInfo: [],
    totalNotes: null,
    page: null,
    loadingNotes: false
  };
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

  addNote(state, payload) {
    state.notes.unshift(payload);
  },

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
    let totalPages = Math.floor(state.totalNotes / 10) + 1
    if (state.page < totalPages) {
      state.page = state.page + 1
    }
    console.log('page after mutation, ', state.page);
  },

  setTotalNotes(state, totalNotes) {
    state.totalNotes = totalNotes
  },

  setSingleNote(state, note) {
    state.singleNote = note;
  },

  updateNote(state, updatedNote) {
    const updatingNote = state.notes.find(note => note._id === updatedNote._id);
    Object.assign(updatingNote, updatedNote);

    Object.assign(state.singleNote, updatedNote);
  },

  deleteNote(state, _id) {
    state.notes = state.notes.filter(note => {
      return note._id !== _id;
    });
  },

  setLoadingNotes(state, isLoading) {
    state.loadingNotes = isLoading
  },

  addOfflineNote(state, payload) {
    state.notes.unshift(payload)
  },

  unshiftOfflineNote(state) {
    let offlineNoteCount = state.notes.filter(
      note => note.offline === true
    ).length;
    state.notes[offlineNoteCount - 1].offline = false;
  }

};
