import axios from 'axios'

export default {
  setSearch({ commit }, value) {
    commit('setSearch', value)
  },

  async getBooks({ commit, state }) {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${ state.search }`)
    console.log(response);

    const books = response.data.items

    commit('setBooks', books)
  }
}
