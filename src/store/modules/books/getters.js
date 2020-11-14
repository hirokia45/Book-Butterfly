export default {
  search(state) {
    return state.search
  },

  books(state) {
    return state.books
  },

  myBooks(state, getters) {
        let sortedMybooks = getters.sortItems;
        return sortedMybooks;
  },

  archives(state, getters) {
    let sortedArchives = getters.sortItems
    return sortedArchives
  },

  sortItems(state) {
    const items = state[state.tab]
    const sortedItems = [...items].sort((a, b) => {
      if (state.sort === 'title') {
        if (a.volumeInfo[state.sort] > b.volumeInfo[state.sort]) {
          return 1
        } else if (a.volumeInfo[state.sort] < b.volumeInfo[state.sort]) {
          return -1;
        } else return 0;
      }

      else {
        if (a[state.sort] < b[state.sort]) {
          return 1
        } else if (a[state.sort] > b[state.sort]) {
          return -1
        } else return 0
      }
    })
    return sortedItems
  }
}
