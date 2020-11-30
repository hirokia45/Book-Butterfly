import Vue from 'vue'

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
    console.log("resetNoteState in mutations")
    Object.assign(state, getDefaultNoteState())
  },

  emptyNotes(state) {
    state.notes = []
  },

  /*
    Setting Notes
  */

  pageInit(state) {
    state.page = null
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
    console.log("page after mutation, ", state.page)
  },

  setTotalNotes(state, totalNotes) {
    state.totalNotes = totalNotes
  },

  setSingleNote(state, note) {
    state.singleNote = note
  },

  /*
    Modifiers
  */

  addNote(state, payload) {
    state.notes.unshift(payload)
  },

  updateNote(state, updatedNote) {
    const updatingNote = state.notes.find(note => note._id === updatedNote._id)
    Object.assign(updatingNote, updatedNote)

    Object.assign(state.singleNote, updatedNote)
  },

  deleteNote(state, _id) {
    state.notes = state.notes.filter(note => {
      return note._id !== _id
    })
  },

  setLoadingNotes(state, isLoading) {
    state.loadingNotes = isLoading
  },

  /*
    Background Sync - offline related mutations
  */

  setOfflineSingleNote(state, _id) {
    state.singleNote = state.notes.find(note => note._id === _id)
  },

  updateNoteOffline(state, payload) {
    const updatingNote = state.notes.find(note => note._id === payload._id)
    if (!updatingNote.hasOwnProperty("offlineUpdate")) {
      Vue.set(updatingNote, "offlineUpdate", true)
      Object.assign(updatingNote, payload)
    } else {
      payload = {
        ...payload,
        offlineUpdate: true
      }
      Object.assign(updatingNote, payload)
    }
  },

  deleteImageOffline(state, _id) {
    const update = { photo: null }
    const updatingNote = state.notes.find(note => note._id === _id)
    Vue.set(updatingNote, "offlineUpdate", true)
    Object.assign(updatingNote, update)
  },

  deleteNoteOffline(state, _id) {
    state.notes = state.notes.filter(note => {
      return note._id !== _id
    })
  },

  resetOfflineNote(state) {
    let offlineNoteCount = state.notes.filter(note => note.offline === true)
      .length
    if (offlineNoteCount) {
      state.notes[offlineNoteCount - 1].offline = false
    }
  },

  resetOfflineUpdateStatus(state, url) {
    const _id = url.split("/").pop()
    let offlineUpdatesCount = state.notes.filter(
      note => note.offlineUpdate === true
    ).length
    if (offlineUpdatesCount) {
      const change = { offlineUpdate: false }
      const updatingNote = state.notes.find(note => note._id === _id)
      Object.assign(updatingNote, change)
    }
  }
};
