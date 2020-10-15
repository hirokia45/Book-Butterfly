import Vue from 'vue'
export default {
  deleteTask(state, id) {
    Vue.delete(state.notes, id)
  },
  addNote(state, payload) {
    Vue.set(state.notes, payload.note.id, payload.note)
  }
}
