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
    state.myBooks = state.myBooks.unshift(book)
  }
}
