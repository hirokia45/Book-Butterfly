<template>
  <q-card
    class="book-card column justify-between"
    bordered
    flat
  >
    <template>
      <img :class="{'my-book-img': !isSearchTab}" :src="book.volumeInfo.imageLinks.thumbnail">

      <q-card-section class="q-pb-none">
        <div class="text-subtitle2">{{ book.volumeInfo.title }}</div>
        <div v-if="book.volumeInfo.authors && isSearchTab" class="text-subtitle2">{{ book.volumeInfo.authors[0] }}</div>
        <div v-if="isSearchTab" class="text-subtitle2">{{ book.volumeInfo.publishedDate }}</div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <div class="row info-container">
          <div v-if="isBookShelfTab" class="q-gutter-y-md">
            <q-rating
              readonly
              flat
              v-model="book.myRate"
              :max="4"
              size="2em"
              color="green-5"
              :icon="icons"
            />
          </div>

          <q-btn
            @click="showBookDetailsModal"
            class="info-button"
            color="grey-10"
            dense
            flat
            icon="eva-info-outline"
            round
          />
        </div>
      </q-card-section>
    </template>

    <q-dialog v-model="showBookDetails">
      <book-details
        @close="showBookDetails = false"
        :id="id"
        :book="book"
        :isBookShelfTab="isBookShelfTab"
        :isSearchTab="isSearchTab"
      />
    </q-dialog>
  </q-card>
</template>

<script>
import BookDetails from '../Modals/BookDetails'

export default {
  components: {
    BookDetails
  },
  props: ['id', 'book', 'isBookShelfTab', 'isSearchTab'],
  data() {
    return {
      showBookDetails: false,
      ratingModel: this.book.rating,
      icons: [
        'sentiment_very_dissatisfied',
        'sentiment_dissatisfied',
        'sentiment_satisfied',
        'sentiment_very_satisfied'
      ]
    }
  },
  computed: {
    searchTab() {
      this.$route.path
    }
  },
  methods: {
    showBookDetailsModal() {
      this.showBookDetails = true
    }
  }
}
</script>

<style lang="sass" scoped>
.book-card
  width: 100%
  max-width: 200px

.my-book-img
  max-height: 200px

.info-container
  position: relative
.info-button
  position: absolute
  bottom: 0
  right: 0
</style>
