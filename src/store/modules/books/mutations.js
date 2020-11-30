const getDefaultBookState = () => {
  return {
    books: [],
    search: "",
    searchFilter: '',
    sort: "date",
    myBooks: [],
    archives: [],
    tab: '',
    totalBooksCompleted: null
  };
};

export default {
  resetBookState(state) {
    console.log("resetBookState in mutations")
    Object.assign(state, getDefaultBookState())
  },

  /*
    Tools
  */
  setSearch(state, value) {
    state.search = value
  },

  setSearchFilter(state, value) {
    state.searchFilter = value
  },

  resetSearch(state) {
    state.search = ""
  },

  setSort(state, value) {
    state.sort = value
  },

  deleteBooks(state) {
    state.books = []
  },

  /*
    Set Books
  */
  setTab(state, value) {
    state.tab = value
  },

  setBooks(state, books) {
    state.books = books
  },

  setMyBooks(state, books) {
    state.myBooks = books.filter(book => book.archive === false)
    state.archives = books.filter(book => book.archive === true)
  },

  setTotalBooksCompleted(state, totalBooksCompleted) {
    state.totalBooksCompleted = totalBooksCompleted
  },

  /*
    Modifiers
  */

  addedBookToShelf(state, book) {
    state.myBooks.unshift(book)
    return state.myBooks
  },

  updateMyBook(state, updatedMyBook) {
    const updatingBook = state.myBooks.find(
      myBook => myBook._id === updatedMyBook._id
    );
    Object.assign(updatingBook, updatedMyBook)
  },

  moveToArchive(state, book) {
    state.myBooks = state.myBooks.filter(myBook => {
      return myBook._id !== book._id
    })
    state.archives.unshift(book)
    return state.archives
  },

  moveToShelf(state, book) {
    state.archives = state.archives.filter(archive => {
      return archive._id !== book._id
    })
    state.myBooks.unshift(book)
    return state.myBooks
  },

  removeMyBook(state, _id) {
    state.myBooks = state.myBooks.filter(myBook => {
      return myBook._id !== _id
    })
  },

  removeArchive(state, _id) {
    state.archives = state.archives.filter(archive => {
      return archive._id !== _id
    })
  }
}
