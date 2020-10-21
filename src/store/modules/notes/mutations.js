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

  // setSingleNote(state, resSingleNote) {
  //   console.log('mutation single note: ', resSingleNote);
  //   state.singleNote = resSingleNote
  //   console.log('state.singleNote in mutations: ', state.singleNote);
  // },

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
