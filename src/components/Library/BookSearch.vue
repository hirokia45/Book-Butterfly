<template>
  <div>
    <div class="row justify-center">
      <the-search-bar @submit-search="searchBooks" />
      <q-btn
        @click="deleteSearchResult"
        class="q-ml-sm"
        color="grey-10"
        flat
        icon="eva-trash-2-outline"
        round
      />
    </div>

    <the-scroll-area>
      <div class="q-pa-sm row q-gutter-lg justify-center">
      <book-card
        :isSearchTab="isSearchTab"
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
  data() {
    return {
      isSearchTab: true
    }
  },
  computed: {
    ...mapGetters('books', ['search', 'books'])
  },
  methods: {
    ...mapActions('books', ['getBooks', 'deleteBooks']),
    async searchBooks() {
      await this.getBooks()
    },
    deleteSearchResult() {
      this.deleteBooks()
    }
  }
}
</script>
