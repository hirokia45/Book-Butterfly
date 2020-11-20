<template>
  <q-card class="full-width q-pa-sm">
    <modal-header>Add Note</modal-header>

    <div class="row justify-center">
      <q-select
        v-model="selected"
        :options="options"
        :disable="isFilled"
        label="Fill Info from Your Bookshelf"
        style="width: 320px;"
        class="q-mb-md"
        outlined
        rounded
        dense
        behavior="menu"
        @click="setBookInfo"
      />
      <q-btn
        v-if="!!selected && !isFilled && checkIfLoaded"
        @click="setBookInfo"
        class="q-ml-sm q-mb-md"
        color="secondary"
        icon="eva-edit-2-outline"
        outline
        round
      />
      <q-btn
        v-if="!!isFilled && checkIfLoaded"
        @click="unsetBookInfo"
        class="q-ml-sm q-mb-md"
        color="grey-10"
        icon="eva-trash-2-outline"
        outline
        round
      />
      <q-btn
        v-if="!checkIfLoaded"
        @click="loadMyBooks"
        class="q-ml-sm q-mb-md"
        color="cyan-6"
        icon="eva-download-outline"
        outline
        round
      />
    </div>

    <form @submit.prevent="submitForm">
      <q-card-section class="q-pt-none">

        <modal-title
          :title.sync="noteToSubmit.title"
          ref="modalTitle"
        />

        <modal-author :author.sync="noteToSubmit.author"/>

        <div class="row justify-center">
          <modal-pages
            :pageFrom.sync="noteToSubmit.pageFrom"
            :pageTo.sync="noteToSubmit.pageTo"
          />
          <q-btn
            @click="toggleChapterInput"
            class="q-ml-sm q-mb-md chapter-toggle"
            :color="!showChapterInput ? 'cyan-6' : 'gray-10'"
            icon="eva-book-open-outline"
            size="10px 10px"
            outline
            round
          />
        </div>

        <modal-chapter
          v-if="showChapterInput"
          :chapter.sync="noteToSubmit.chapter"
        />

        <modal-category :category.sync="noteToSubmit.category" />

        <modal-comment :comment.sync="noteToSubmit.comment" />

        <modal-button @saved="isSaved = true"></modal-button>
      </q-card-section>
    </form>
  </q-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import mixinsAddEditNote from 'src/mixins/mixin-add-edit-note'

export default {
  mixins: [mixinsAddEditNote],
  data() {
    return {
      noteToSubmit: {
        title: '',
        author: '',
        pageFrom: null,
        pageTo: null,
        chapter: '',
        category: '',
        comment: '',
      },
      selected: '',
      isFilled: false,
      showChapterInput: false,
      isSaved: false
    }
  },
  computed: {
    ...mapGetters('books', ['myBooks']),
    checkIfLoaded() {
      return (this.myBooks.length > 0 ? true : false)
    },
    options() {
      return this.myBooks.map(myBook => {
        return myBook.volumeInfo.title
      })
    },
  },
  methods: {
    ...mapActions('notes', ['addNote']),
    ...mapActions('books', ['getMyBooks']),
    async submitNote() {
      try {
        await this.addNote(this.noteToSubmit)
        this.isSaved = true
        this.$emit('close')
      } catch (err) {
        this.$q.dialog({
          title: 'Error',
          message: 'Could not add new note'
        })
      }
    },
    setBookInfo() {
      const bookInfo = this.myBooks.find(myBook => {
        return myBook.volumeInfo.title = this.selected
      })
      this.noteToSubmit.title = bookInfo.volumeInfo.title
      this.noteToSubmit.author = bookInfo.volumeInfo.authors[0]
      this.noteToSubmit.category = bookInfo.volumeInfo.categories[0]
      this.isFilled = true
    },
    unsetBookInfo() {
      this.selected = ''
      this.noteToSubmit.title = ''
      this.noteToSubmit.author = ''
      this.noteToSubmit.category = ''
      this.isFilled = false
    },
    loadMyBooks() {
      this.getMyBooks()
    },
    toggleChapterInput() {
      this.showChapterInput = !this.showChapterInput
    }
  },
}
</script>

<style lang="sass" scoped>
.chapter-toggle
  height: 40px
  width: 40px
  top: 7px
</style>
