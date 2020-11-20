import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const getDefaultNoteState = () => {
  return {
    notes: [],
    singleNote: {},
    fiveNewestNotes: [],
    calendarInfo: [],
    totalNotes: 0,
    page: null,
    loadingNotes: false
  }
}
export default {
  namespaced: true,
  state: getDefaultNoteState(),
  mutations,
  actions,
  getters
}
