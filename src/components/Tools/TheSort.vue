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
      :label="$t('sortBy')"
      bg-color="white"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      options: [
        {
          label: this.$t('updated'),
          value: 'updatedAt'
        },
        {
          label: this.$t('titleTool'),
          value: 'title'
        },
        {
          label: this.$t('finishedReading'),
          value: 'completed'
        }
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
  }
}
</script>

<style lang="sass" scoped>
.sort-bar
  width: 200px
</style>
