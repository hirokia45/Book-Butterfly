import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
  namespaced: true,
  state() {
    return {
      notes: [],
      singleNote: {},
      loadingNotes: false
    };
  },
  mutations,
  actions,
  getters
}
