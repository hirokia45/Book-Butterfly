import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const getDefaultNoteState = () => {
  return {
    notes: [],
    singleNote: {},
    totalItems: null,
    page: null,
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
