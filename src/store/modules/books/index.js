import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const getDefaultBookState = () => {
  return {
    books: [],
    search: ''
  }
}
export default {
  namespaced: true,
  state: getDefaultBookState(),
  mutations,
  actions,
  getters
}
