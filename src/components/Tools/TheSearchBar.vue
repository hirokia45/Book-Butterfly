<template>
  <div class="row justify-center q-mr-sm">
    <form @submit.prevent="submitSearch">
      <q-input
        v-model="searchField"
        @keyup.esc="searchField = ''"
        class="col search-bar"
        dense
        :label="$t('searchBooks')"
        outlined
        rounded
        standout
        bg-color="white"
      >
        <template v-slot:append>
          <q-icon v-if="searchField !== ''" name="close" @click="searchField = ''" class="cursor-pointer" />
          <q-btn
            @click="submitSearch"
            class="cursor-pointer q-pa-none"
            flat
            icon="eva-search-outline"
            round
            type="submit"
          />
        </template>
      </q-input>

    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('books', ['search']),
    searchField: {
      get() {
        return this.search
      },
      set(value) {
        this.setSearch(value)
      }
    }
  },
  methods: {
    ...mapActions('books', ['setSearch']),
    submitSearch() {
      this.$emit('submit-search')
    }
  }
}
</script>

<style lang="sass" scoped>
.search-bar
  width: 200px
</style>
