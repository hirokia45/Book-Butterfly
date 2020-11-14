<template>
  <div>
    <div class="row justify-center">
      <the-sort />
    </div>

    <the-scroll-area>
      <div class="q-pa-sm row q-gutter-lg justify-center">
      <book-card
        :isBookShelfTab="isBookShelfTab"
        v-for="book in sortedMyBooks"
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
import TheSort from '../Tools/TheSort'
import BookCard from '../Library/BookCard'
import TheScrollArea from '../Layouts/TheScrollArea'

export default {
  components: {
    TheSort,
    BookCard,
    TheScrollArea
  },
  data() {
    return {
      isBookShelfTab: true
    }
  },
  computed: {
    ...mapGetters('books', ['search', 'sortedMyBooks'])
  },
  methods: {
    ...mapActions('books', ['getMyBooks', 'setTab']),
    async loadBooks() {
      console.log('getmybooks');
      await this.getMyBooks()
    }
  },
  created() {
    this.loadBooks()
    let tab = 'myBooks'
    this.setTab(tab)
  }
}
</script>
