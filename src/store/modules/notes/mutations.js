import Vue from 'vue'
import axios from 'axios'

export default {
  deleteTask(state, id) {
    Vue.delete(state.notes, id)
  },
  addNote(state, payload) {
    state.notes.push(payload)
    // Vue.set(state.notes, payload.note.id, payload.note)
  },
  updateNote(state, payload) {
    Object.assign(state.notes[payload.id], payload.updates)
  },
  getNotes(state, notes) {
    state.notes = notes
  }
}
