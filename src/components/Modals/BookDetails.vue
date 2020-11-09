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

          <div class="text-subtitle2">
            by {{ author }}
          </div>

          <div
            v-for="(category, index) in book.volumeInfo.categories"
            :key="`first-${index}`"
            class="text-caption"
          >
            Category: {{book.volumeInfo.mainCategory || category }}
          </div>

          <div class="row">
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
          <div class="text-subtitle2">Language: {{ language }}</div>
          <div class="text-subtitle2">Pages: {{ book.volumeInfo.pageCount }}p</div>

          <div v-if="book.saleInfo.listPrice" class="text-subtitle2">Price: {{ book.saleInfo.listPrice.amount }} {{ book.saleInfo.listPrice.currencyCode }}</div>

        </div>
      </div>
    </q-card-section>

    <q-card-section class="modal-bottom-section">
      <q-btn
        flat
        type="submit"
        text-color="white"
        class="primary-gradient-background add-to-bookshelf-button"
        label="Add to Bookshelf"

      />
    </q-card-section>
  </q-card>
</template>

<script>
import ModalHeader from '../Modals/GeneralModalComponents/ModalHeader'
export default {
  components: {
    ModalHeader
  },
  props: ['id', 'book'],
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
}
</script>

<style lang="sass" scoped>
.modal-bottom-section
  position: relative

.add-to-bookshelf-button
  position: absolute
  bottom: 15px
  right: 20px


.regular-thumbnail
  width: 80%

.small-window-thumbnail
  width: 50%
</style>
