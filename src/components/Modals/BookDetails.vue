<template>
  <q-card class="full-width modal-frame">
    <modal-header>Book Details</modal-header>

    <q-card-section class="q-pt-none">
      <div class="row">
        <div class="col-12 col-sm-5 text-center">
          <img :src="book.volumeInfo.imageLinks.thumbnail" :class="thumbnailSize">
        </div>

        <div class="col-12 col-sm-7">
          <div class="text-h6">{{book.volumeInfo.title}}</div>

          <div class="text-caption">{{book.volumeInfo.subtitle}}</div>

          <div v-if="book.volumeInfo.authors" class="text-subtitle2">
            by {{ author }}
          </div>

          <div
            v-for="(category, index) in book.volumeInfo.categories"
            :key="`first-${index}`"
            class="text-caption"
          >
            Category: {{book.volumeInfo.mainCategory || category }}
          </div>

          <div class="row" v-if="isSearchTab">
            <div>
              <q-rating
                v-model="ratings"
                size="sm"
                color="orange"
                readonly
              />
            </div>
            <div class="q-ml-sm column justify-center text-blue">
              {{book.volumeInfo.ratingsCount || 0}} rating
            </div>
          </div>

          <q-separator class="q-my-sm" />

          <div class="text-body2">{{ book.volumeInfo.description }}</div>

          <q-separator class="q-my-sm" />

          <div class="text-subtitle2">Publisher: {{ book.volumeInfo.publisher }}</div>
          <div class="text-subtitle2">Published Date: {{ book.volumeInfo.publishedDate }}</div>
          <div v-if="isSearchTab" class="text-subtitle2">Language: {{ language }}</div>
          <div v-if="isSearchTab" class="text-subtitle2">Pages: {{ book.volumeInfo.pageCount }}p</div>

          <template v-if="isSearchTab">
            <div v-if="book.saleInfo.listPrice" class="text-subtitle2">Price: {{ book.saleInfo.listPrice.amount }} {{ book.saleInfo.listPrice.currencyCode }}</div>
          </template>

          <div v-if="isBookShelfTab" class="q-gutter-y-md q-mt-xs text-center">
            <q-rating
              readonly
              flat
              v-model="book.myRate"
              :max="4"
              size="3em"
              color="green-5"
              :icon="icons"
            />
          </div>

        </div>
      </div>
    </q-card-section>

    <q-card-section v-if="isBookShelfTab" class="modal-bottom-section row justify-between">
      <q-fab
        v-model="myBookFab"
        vertical-actions-align="right"
        icon="eva-arrow-ios-upward-outline"
        direction="up"
        class="button-position grey-gradient-background"
      >
        <q-fab-action
          @click="promptToRemove(book._id)"
          dense
          rounded
          text-color="white"
          class="danger-gradient-background"
          icon="eva-trash-2-outline"
          label="Delete"
        />
        <q-fab-action
          @click="promptToMoveToArchive"
          text-color="white"
          class="primary-gradient-background"
          label="Archive"
          icon="eva-archive-outline"
        />
        <q-fab-action
          v-if="!book.completed"
          @click="promptToFinishReading(book)"
          text-color="white"
          class="primary-gradient-background"
          label="Finished"
          icon="eva-award-outline"
        />
        <q-fab-action
          @click="showRateMyBookModal"
          text-color="white"
          class="primary-gradient-background"
          label="Rate"
          icon="eva-star-outline"
        />

      </q-fab>
    </q-card-section>

    <q-card-section
      v-if="isSearchTab"
      class="modal-bottom-section"
    >
      <q-btn
        @click="promptToAddBook"
        flat
        type="submit"
        text-color="white"
        class="primary-gradient-background button-position"
        label="Add to Bookshelf"
      />
    </q-card-section>

    <q-dialog v-model="showRateMyBook">
      <rate-my-book-modal
        @close="showRateMyBook = false"
        :_id="book._id"
        :myRate="book.myRate"
      />
    </q-dialog>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'
import ModalHeader from '../Modals/GeneralModalComponents/ModalHeader'
import RateMyBookModal from '../Modals/RateMyBook'

export default {
  components: {
    ModalHeader,
    RateMyBookModal
  },
  props: ['id', 'book', 'isBookShelfTab', 'isSearchTab'],
  data() {
    return {
      ratingModel: this.book.rating,
      showRateMyBook: false,
      myBookFab: false,
      icons: [
        'sentiment_very_dissatisfied',
        'sentiment_dissatisfied',
        'sentiment_satisfied',
        'sentiment_very_satisfied'
      ]
    }
  },
  computed: {
    author() {
      if(this.book.volumeInfo.authors.length > 2) {
        return this.book.volumeInfo.authors[0] + ' and more'
      } else {
        return this.book.volumeInfo.authors[0]
      }
    },
    ratings() {
      return this.book.volumeInfo.averageRating || 0
    },
    language() {
      if ( this.book.volumeInfo.language === 'ja') {
        return '日本語'
      }
    },
    thumbnailSize() {
      if (window.innerWidth < 600) {
        return 'small-window-thumbnail'
      } else if (window.innerWidth > 601) {
        return 'regular-thumbnail'
      }
    }
  },
  methods: {
    ...mapActions('books', ['addBookToBookshelf', 'updateMyBook', 'moveToArchive', 'removeMyBook']),
    showRateMyBookModal() {
      this.showRateMyBook = true
    },
    promptToAddBook() {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you ready to add this book to your bookshelf?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.addBookToBookshelf(this.book)
        this.$emit('close')
      })
    },

    promptToRateBook(_id) {
      this.$q.dialog({
        title: 'How do you like this book?'
      })
    },

    promptToFinishReading(book) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Do you mark this book as finished reading?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        const completed = !this.book.completed
        const updates = {
          _id: this.book._id,
          completed: completed
        }
        this.updateMyBook(updates)
      })
    },

    promptToMoveToArchive() {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Do you want to move this book to archive?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.moveToArchive(_id)
      })
    },

    promptToRemove(_id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Do you really want to remove this book from your bookshelf?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.removeMyBook(_id)
      })
    }

  },
}
</script>

<style lang="sass" scoped>
.modal-bottom-section
  position: relative

.button-position
  position: absolute
  bottom: 15px
  right: 20px

.regular-thumbnail
  width: 80%

.small-window-thumbnail
  width: 50%
</style>
