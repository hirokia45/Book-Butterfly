import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const getDefaultBookState = () => {
  return {
    books: [],
    search: '',
    searchFilter: 'keyword',
    sort: 'updatedAt',
    myBooks: [],
    archives: [],
    tab: ''
  }
}
export default {
  namespaced: true,
  state: getDefaultBookState(),
  mutations,
  actions,
  getters
}
