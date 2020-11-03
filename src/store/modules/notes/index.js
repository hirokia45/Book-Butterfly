import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const getDefaultNoteState = () => {
  return {
    notes: [],
    singleNote: {},
    loadingNotes: false
  };
}
export default {
  namespaced: true,
  state: getDefaultNoteState(),
  mutations,
  actions,
  getters
}
