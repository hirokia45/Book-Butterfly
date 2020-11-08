<template>
  <the-search-bar @submit-search="searchBooks" />
</template>

<script>
import { mapGetters } from 'vuex'
import TheSearchBar from '../Tools/TheSearchBar'

export default {
  components: {
    TheSearchBar
  },
  computed: {
    ...mapGetters('books', ['search'])
  },
  methods: {
    async searchBooks() {
      const response = await this.$axios.get(`https://www.googleapis.com/books/v1/volumes?q=${ this.search }`)
      console.log(response);
    }
  }
}
</script>
