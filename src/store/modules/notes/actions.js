export default {
  deleteNote({ commit }, id) {
    commit('deleteTask', id)
  },
  addNote({ commit }, note) {
    let payload = {
      note: note,
    }

    commit('addNote', payload)
  }
}
