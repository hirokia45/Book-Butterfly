<template>
  <div>
    <div class="row justify-center">
      <the-search-bar @submit-search="searchBooks" />
      <book-search-filter v-if="!shrinkTools" />
      <q-btn
        v-if="!shrinkTools && books.length > 0"
        @click="deleteSearchResult"
        class="q-ml-sm"
        color="grey-10"
        flat
        icon="eva-trash-2-outline"
        round
      />

      <q-btn-dropdown
        v-if="shrinkTools"
        flat
        rounded
        class="grey-gradient-background"
        label="Tools"
      >
        <q-list>
          <q-item clickable v-close-popup @click="showFilter = true">
            <q-item-section avatar>
              <q-avatar icon="eva-funnel-outline" color="primary" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Search Filter</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="deleteSearchResult">
            <q-item-section avatar>
              <q-avatar icon="eva-trash-2-outline" color="secondary" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Delete Result</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
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

    <q-dialog v-model="showFilter">
      <filter-modal @close="showFilter = false" />
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TheSearchBar from '../Tools/TheSearchBar'
import BookSearchFilter from '../Tools/BookSearchFilter'
import BookCard from '../Library/BookCard'
import FilterModal from '../Modals/FilterModal'
import TheScrollArea from '../Layouts/TheScrollArea'

export default {
  components: {
    TheSearchBar,
    BookSearchFilter,
    BookCard,
    FilterModal,
    TheScrollArea
  },
  data() {
    return {
      isSearchTab: true,
      showFilter: false
    }
  },
  computed: {
    ...mapGetters('books', ['search', 'books']),
    shrinkTools() {
      return (window.innerWidth < 400 ? true : false)
    }
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
