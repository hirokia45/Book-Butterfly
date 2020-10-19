import Vue from 'vue'
import axios from 'axios'

export default {
  addNote(state, payload) {
    state.notes.push(payload);
    // Vue.set(state.notes, payload.note.id, payload.note)
  },
  updateNote(state, payload) {
    Object.assign(state.notes[payload.id], payload.updates);
  },
  getNotes(state, notes) {
    state.notes = notes;
  },

  deleteTask(state, _id) {
    console.log('_id: ', _id);
    state.notes = state.notes.filter(note => {
      return note._id !== _id
    })
    // Vue.delete(state.notes, _id);
  }
};
