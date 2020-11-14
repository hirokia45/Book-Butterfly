export default {
  search(state) {
    return state.search
  },

  books(state) {
    return state.books
  },

  myBooks(state) {
    return state.myBooks
  },

  totalBooksCompleted(state) {
    return state.totalBooksCompleted
  },

  archives(state) {
    return state.archives
  },

  sortedMyBooks(state, getters) {
    let sortedMybooks = getters.sortItems;
    return sortedMybooks;
  },

  sortedArchives(state, getters) {
    let sortedArchives = getters.sortItems
    return sortedArchives
  },

  sortItems(state) {
    if (state.myBooks || state.archives) {
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
}
