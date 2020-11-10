<template>
  <div>
    <div class="row justify-center">
      <the-search-bar />
      <q-btn
        class="q-ml-sm"
        color="grey-10"
        flat
        icon="eva-trash-2-outline"
        round
      />
    </div>

    <the-scroll-area>
      <div class="q-pa-sm row q-gutter-lg justify-center">
      <my-book-card
        v-for="book in myBooks"
        :key="book.id"
        :id="book.id"
        :book="book"
      ></my-book-card>
      </div>
    </the-scroll-area>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TheSearchBar from '../Tools/TheSearchBar'
import MyBookCard from '../Library/MyBookCard'
import TheScrollArea from '../Layouts/TheScrollArea'

export default {
  components: {
    TheSearchBar,
    MyBookCard,
    TheScrollArea
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
