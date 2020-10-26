import Vue from 'vue'
import axios from 'axios'

export default {
  addNote(state, payload) {
    state.notes.push(payload);
    // Vue.set(state.notes, payload.note.id, payload.note)
  },

  setNotes(state, notes) {
    state.notes = notes;
  },

  setSingleNote(state, resData) {
    state.singleNote = resData
  },

  updateNote(state, updatedNote) {
    const updatingNote = state.notes
      .find(note => note._id === updatedNote._id)
    Object.assign(updatingNote, updatedNote);
  },

  deleteTask(state, _id) {
    state.notes = state.notes.filter(note => {
      return note._id !== _id;
    });
  }
};
