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

  updateNote(state, payload) {
    const updatingNote = state.notes
      .find(note => note._id === payload._id)
    Object.assign(updatingNote, payload.updatedNote);
  },

  deleteTask(state, _id) {
    state.notes = state.notes.filter(note => {
      return note._id !== _id;
    });
  }
};
