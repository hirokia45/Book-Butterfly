<template>
  <div class="justify-center">
    <q-select
      v-model="sortBy"
      :options="options"
      emit-value
      map-options
      dense
      rounded
      outlined
      class="sort-bar q-mb-xs"
      label="Sort by"
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
          label: 'Date Desc.',
          value: 'dateDesc'
        },
        {
          label: 'Date Asce.',
          value: 'dateAsce'
        },
        {
          label: 'Name',
          value: 'name'
        },

      ]
    }
  },
  computed: {
    ...mapState('books', ['sort']),
    sortBy: {
      get() {
        return this.sort
      },
      set(value) {
        this.setSort(value)
      }
    }
  },
  methods: {
    ...mapActions('books', ['setSort']),
    customSort (sortBy, descending) {
      const data = [...books]

      if (sortBy) {
        data.sort((a, b) => {
          const x = descending ? b : a
          const y = descending ? a : b

          if (sortBy === 'name') {
            return x[sortBy] > y[sortBy] ? 1 : x[sortBy] < y[sortBy] ? -1 : 0
          }
        })
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.sort-bar
  width: 200px
</style>
