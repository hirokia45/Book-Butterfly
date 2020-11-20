<template>
  <div class="full-height column">
    <div class="row justify-center col-1  q-mb-xs">
      <the-sort />
    </div>

    <base-scroll-area class="full-height col">
      <div class="q-pa-sm row q-gutter-lg justify-center">
      <book-card
        :isBookShelfTab="isBookShelfTab"
        v-for="book in sortedMyBooks"
        :key="book.id"
        :id="book.id"
        :book="book"
      ></book-card>
      </div>
    </base-scroll-area>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    TheSort: () => import('../Tools/TheSort'),
    BookCard: () => import('../Library/BookCard'),
    BaseScrollArea: () => import('../Layouts/BaseScrollArea')
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

<style lang="sass" scoped>
.flex-shrink
  flex-shrink: 0
</style>
