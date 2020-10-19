import axios from 'axios'

export default {
  deleteNote({ commit }, id) {
    commit('deleteTask', id)
  },
  addNote({ commit }, note) {
    let payload = {
      note: note,
    }
    commit('addNote', payload)
  },
  updateNote({ commit }, payload) {
    commit('updateNote', payload)
  },
  async getNotes(context) {
    const response = await axios.get(`${process.env.API}/notes`);
    const notes = response.data.notes

    if (!response.status === 200) {
      const error = new Error(response.message || 'Failed to fetch...')
      throw error
    }

    context.commit('getNotes', notes)
  }
}
