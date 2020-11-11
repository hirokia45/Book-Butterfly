import axios from 'axios'
import { Dialog, Notify } from 'quasar';
import authHeader from "../../../services/auth-header";

export default {
  setSearch({ commit }, value) {
    commit('setSearch', value)
  },

  resetSearch({ commit }) {
    commit('resetSearch')
  },

  deleteBooks({ commit }) {
    commit('deleteBooks')
  },

  async getBooks({ commit, state }) {
    const uriComponent = encodeURIComponent(state.search);
    const response = await axios.get(
      `${process.env.API}/books/googlebooks/api?q=${uriComponent}`,
      { headers: authHeader() }
    )

    const books = response.data.books.items
    console.log(books);
    commit('setBooks', books)
  },

  async getMyBooks({ commit }) {
    try {
      const response = await axios.get(
        `${process.env.API}/books/bookshelf?sortBy=createdAt:desc`,
        { headers: authHeader() }
      )
      console.log('response getmubooks', response);
      const myBooks = response.data.myBooks
      commit("setMyBooks", myBooks)
    } catch (err) {
      console.error(err);
      Dialog.create({
        title: "Error",
        message: err.response.data.message
      });
    }
  },

  async addBookToBookshelf({ commit }, book) {
    console.log('triggered');
    if (book.volumeInfo.categories === undefined) {
      book.volumeInfo.categories = []
    }
    if (book.volumeInfo.authors === undefined) {
      book.volumeInfo.authors = []
    }
    const bookInfo = {
      id: book.id,
      volumeInfo: {
        industryIdentifiers: [
          {
            type: book.volumeInfo.industryIdentifiers[0].type,
            identifier: book.volumeInfo.industryIdentifiers[0].identifier
          }
        ],
        title: book.volumeInfo.title,
        subtitle: book.volumeInfo.subtitle,
        authors: [...book.volumeInfo.authors],
        publisher: book.volumeInfo.publisher,
        publishedDate: book.volumeInfo.publishedDate,
        description: book.volumeInfo.description,
        categories: [...book.volumeInfo.categories] || [],
        imageLinks: {
          thumbnail: book.volumeInfo.imageLinks.thumbnail
        }
      }
    }
    console.log('before try', bookInfo);

    try {
      const response = await axios.post(`${process.env.API}/books/bookshelf`, bookInfo, {
        headers: authHeader()
      })
      const book = response.data.book
      commit("addedBookToShelf", book)
      await Notify.create({
        message: "Book Added!",
        timeout: 2000,
        actions: [{ label: "Close", color: "white" }]
      })
    } catch (err) {
      console.error(err)
      Dialog.create({
        title: "Error",
        message: err.response.data.message
      })
    }
  },

  async updateMyBook({ commit }, updates) {
    console.log('request', updates);
    try {
      const response = await axios.patch(
        `${process.env.API}/books/bookshelf`,
        updates,
        { headers: authHeader() }
      )

      const updatedMyBook = response.data.result
      await Notify.create({
        message: "YAY!! You finished reading!",
        timeout: 2000,
        actions: [{ label: "Close", color: "white" }]
      })
      commit("updateMyBook", updatedMyBook)
    } catch (err) {
      Dialog.create({
        title: "Error",
        message: "Could not update the information..."
      })
    }
  },

  async removeMyBook({ commit }, _id) {
    try {
      await axios.delete(`${process.env.API}/books/bookshelf/${_id}`, {
        headers: authHeader()
      })

      commit ("removeMyBook", _id)
    } catch (err) {
      Dialog.create({
        title: "Error",
        message: "Could not delete this book..."
      })
    }
  }
}
