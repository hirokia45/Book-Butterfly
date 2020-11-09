<template>
  <div>
    <the-search-bar @submit-search="searchBooks" />

    <the-scroll-area>
      <div class="q-pa-sm row q-gutter-lg justify-center">
      <book-card
        v-for="book in books"
        :key="book.id"
        :id="book.id"
        :book="book"
      ></book-card>
      </div>
    </the-scroll-area>


  </div>


</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TheSearchBar from '../Tools/TheSearchBar'
import BookCard from '../Library/BookCard'
import TheScrollArea from '../Layouts/TheScrollArea'

export default {
  components: {
    TheSearchBar,
    BookCard,
    TheScrollArea
  },
  computed: {
    ...mapGetters('books', ['search', 'books'])
  },
  methods: {
    ...mapActions('books', ['getBooks']),
    async searchBooks() {
      await this.getBooks()
    }
  }
}
</script>
