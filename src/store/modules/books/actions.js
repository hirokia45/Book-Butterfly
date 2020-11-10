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
    const response = await axios.get(
      `${process.env.API}/books/googlebooks/api?q=${state.search}`,
      { headers: authHeader() }
    )

    const books = response.data.books.items
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

  async addBookToBookshelf({ commit }, bookInfo) {
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
      console.error(err.response)
      Dialog.create({
        title: "Error",
        message: err.response.data.message
      })
    }
  }
}
