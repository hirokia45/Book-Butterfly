<template>
  <div>
    <div class="row justify-center">
      <the-search-bar />
    </div>

    <the-scroll-area>
      <div class="q-pa-sm row q-gutter-lg justify-center">
      <book-card
        :isBookShelfTab="isBookShelfTab"
        v-for="book in myBooks"
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
  data() {
    return {
      isBookShelfTab: true
    }
  },
  computed: {
    ...mapGetters('books', ['search', 'myBooks'])
  },
  methods: {
    ...mapActions('books', ['getMyBooks']),
    async loadBooks() {
      console.log('getmybooks');
      await this.getMyBooks()
    }
  },
  created() {
    this.loadBooks()
  }
}
</script>
