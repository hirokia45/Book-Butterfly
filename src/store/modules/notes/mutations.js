import Vue from 'vue'
import axios from 'axios'

export default {
  addNote(state, payload) {
    state.notes.push(payload);
    // Vue.set(state.notes, payload.note.id, payload.note)
  },

  getNotes(state, notes) {
    state.notes = notes;
  },

  updateNote(state, payload) {
    const updatingNote = state.notes
      .find(note => note._id === payload._id)
    Object.assign(updatingNote, payload.updatedNote);
  },

  deleteTask(state, _id) {
    console.log("_id: ", _id);
    state.notes = state.notes.filter(note => {
      return note._id !== _id;
    });
    // Vue.delete(state.notes, _id);
  }
};
