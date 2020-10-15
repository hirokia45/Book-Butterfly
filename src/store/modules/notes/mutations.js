import Vue from 'vue'
export default {
  deleteTask(state, id) {
    Vue.delete(state.notes, id)
  }
}
