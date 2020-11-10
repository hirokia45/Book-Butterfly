<template>
  <q-card
    class="book-card"
    bordered
    flat
  >
    <template>
      <img :src="book.thumbnail">

      <q-card-section>
        <div class="text-subtitle2">{{ book.title }}</div>
        <div v-if="book.authors" class="text-subtitle2">{{ book.authors[0] }}</div>
        <div class="text-subtitle2">{{ book.publishedDate }}</div>
      </q-card-section>

      <q-btn
        @click="showBookDetailsModal"
        class="info-button"
        color="grey-10"
        dense
        flat
        icon="eva-info-outline"
        round
      />
    </template>

    <q-dialog v-model="showBookDetails">
      <book-details
        @close="showBookDetails = false"
        :id="id"
        :book="book"
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
  props: ['id', 'book'],
  data() {
    return {
      showBookDetails: false
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
  position: relative
  width: 100%
  max-width: 200px

.info-button
  position: absolute
  bottom: 0
  right: 0
</style>
