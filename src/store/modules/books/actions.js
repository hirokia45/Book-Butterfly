import axios from 'axios'
import { Dialog, Notify } from 'quasar';
import authHeader from "../../../services/auth-header";

export default {
  resetBookState({ commit }) {
    console.log("resetBookState triggered in actions");
    commit("resetBookState");
  },

  setSearch({ commit }, value) {
    commit("setSearch", value);
  },

  setSearchFilter({ commit }, value) {
    commit("setSearchFilter", value)
  },

  setSort({ commit }, value) {
    commit("setSort", value)
  },

  setTab({ commit }, value) {
    commit("setTab", value)
  },

  resetSearch({ commit }) {
    commit("resetSearch");
  },

  deleteBooks({ commit }) {
    commit("deleteBooks");
  },

  //${process.env.API}/books/googlebooks/api?q=inauthor:${uriComponent}
  async getBooks({ commit, state }) {
    let uriComponent = ''
    if (state.searchFilter === 'author') {
      uriComponent = `inauthor:${state.search}`
    } else if (state.searchFilter === 'title') {
      uriComponent = `intitle:${state.search}`;
    } else if (state.searchFilter === 'keyword') {
      uriComponent = encodeURIComponent(state.search);
    }

    const response = await axios.get(
      `${process.env.API}/books/googlebooks/api?q=${uriComponent}`,
      { headers: authHeader() }
    );

    const books = response.data.books.items;
    commit("setBooks", books);
  },

  async getMyBooks({ commit }) {
    try {
      const response = await axios.get(
        `${process.env.API}/books/bookshelf?sortBy=createdAt:desc`,
        { headers: authHeader() }
      );

      response.data.myBooks.forEach(book => {
        let timeInData = book.updatedAt;
        book.updatedAt = new Date(timeInData);
      });

      const myBooks = response.data.myBooks;
      const totalBooksCompleted = response.data.totalBooksCompleted

      commit("setMyBooks", myBooks)
      commit("setTotalBooksCompleted", totalBooksCompleted)
    } catch (err) {
      console.error(err);
      Dialog.create({
        title: "Error",
        message: err.response.data.message
      });
    }
  },

  async addBookToBookshelf({ commit }, book) {
    if (book.volumeInfo.categories === undefined) {
      book.volumeInfo.categories = [];
    }
    if (book.volumeInfo.authors === undefined) {
      book.volumeInfo.authors = [];
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
    };

    try {
      const response = await axios.post(
        `${process.env.API}/books/bookshelf`,
        bookInfo,
        {
          headers: authHeader()
        }
      );
      const book = response.data.book;
      commit("addedBookToShelf", book);
      await Notify.create({
        message: "Book Added!",
        timeout: 2000,
        actions: [{ label: "Close", color: "white" }]
      });
    } catch (err) {
      console.error(err);
      Dialog.create({
        title: "Error",
        message: err.response.data.message
      });
    }
  },

  async updateMyBook({ commit }, updates) {
    try {
      const response = await axios.patch(
        `${process.env.API}/books/bookshelf`,
        updates,
        { headers: authHeader() }
      );

      const updatedMyBook = response.data.result;
      await Notify.create({
        message: "YAY!! You finished reading!",
        timeout: 2000,
        actions: [{ label: "Close", color: "white" }]
      });
      commit("updateMyBook", updatedMyBook);
    } catch (err) {
      Dialog.create({
        title: "Error",
        message: "Could not update the information..."
      });
    }
  },

  async moveBook({ commit }, info) {
    const updates = info.updates;
    const mode = info.mode;

    try {
      const response = await axios.patch(
        `${process.env.API}/books/bookshelf`,
        updates,
        { headers: authHeader() }
      );
      const book = response.data.result;
      await Notify.create({
        message: `This book is now in your ${mode}.`,
        timeout: 2000,
        actions: [{ label: "Close", color: "white" }]
      });

      if (mode === "shelf") {
        commit("moveToShelf", book);
      } else if (mode === "archive") {
        commit("moveToArchive", book);
      }
    } catch (err) {
      console.error(err);
      Dialog.create({
        title: "Error",
        message: "Could not move this book..."
      });
    }
  },

  async removeMyBook({ commit }, info) {
    const _id = info._id;
    const mode = info.mode;
    try {
      await axios.delete(`${process.env.API}/books/bookshelf/${_id}`, {
        headers: authHeader()
      });

      if (mode === "archive") {
        commit("removeArchive", _id);
      } else if (mode === "shelf") {
        commit("removeMyBook", _id);
      }
    } catch (err) {
      Dialog.create({
        title: "Error",
        message: "Could not delete this book..."
      });
    }
  },

  async getTotalItemCounts({ commit }) {
    try {
      const response = await axios.get(`${process.env.API}/users/me/total`, { headers: authHeader() })
      const totalNotes = response.data.totalNotes
      const totalBooksCompleted = response.data.totalBooksCompleted

      commit("notes/setTotalNotes", totalNotes, { root: true })
      commit("setTotalBooksCompleted", totalBooksCompleted)
    } catch (err) {
      Dialog.create({
        title: "Error",
        message: "Could not delete this book..."
      })
    }
  }
}
