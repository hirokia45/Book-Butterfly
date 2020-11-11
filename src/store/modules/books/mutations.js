export default {
  setSearch(state, value) {
    state.search = value
  },

  resetSearch(state) {
    state.search = ''
  },

  setBooks(state, books) {
    state.books = books
  },

  deleteBooks(state) {
    state.books = []
  },

  setMyBooks(state, myBooks) {
    state.myBooks = myBooks
  },

  addedBookToShelf(state, book) {
    state.myBooks.unshift(book)
    return state.myBooks
  },

  updateMyBook(state, updatedMyBook) {
    const updatingBook = state.myBooks.find(myBook => myBook._id === updatedMyBook._id)
    Object.assign(updatingBook, updatedMyBook)
  },

  removeMyBook(state, _id) {
    state.myBooks = state.myBooks.filter(myBook => {
      return myBook._id !== _id
    })
  }
}
