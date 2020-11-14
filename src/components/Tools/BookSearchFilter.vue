<template>
  <div class="justify-center">
    <q-select
      v-model="filterBy"
      :options="options"
      emit-value
      map-options
      dense
      rounded
      outlined
      class="filter-bar q-mb-xs"
      label="Search by"
      bg-color="white"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: ['books'],
  data () {
    return {
      options: [
        {
          label: 'Keyword',
          value: 'keyword'
        },
        {
          label: 'Title',
          value: 'title'
        },
        {
          label: 'Author',
          value: 'author'
        }
      ]
    }
  },
  computed: {
    ...mapState('books', ['searchFilter']),
    filterBy: {
      get() {
        return this.searchFilter
      },
      set(value) {
        this.setSearchFilter(value)
      }
    }
  },
  methods: {
    ...mapActions('books', ['setSearchFilter']),
  }
}
</script>

<style lang="sass" scoped>
.filter-bar
  width: 125px
</style>
