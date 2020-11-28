<template>
  <q-card class="full-width q-pa-sm">
    <modal-header>{{$t('editNoteHeader')}}</modal-header>

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
            v-if="!this.noteToSubmit.chapter"
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
          v-if="showChapterInput || this.noteToSubmit.chapter"
          :chapter.sync="noteToSubmit.chapter"
        />

        <modal-category :category.sync="noteToSubmit.category" />

        <modal-comment :comment.sync="noteToSubmit.comment" />

        <modal-button></modal-button>
      </q-card-section>
    </form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'
import mixinsAddEditNote from 'src/mixins/mixin-add-edit-note'

export default {
  mixins: [mixinsAddEditNote],
  props: ['note', '_id'],
  data() {
    return {
      noteToSubmit: {},
      showChapterInput: false
    }
  },
  methods: {
    ...mapActions('notes', ['updateNote','getSingleNote']),
    async submitNote() {
      try {
        this.updateNote({
          _id: this._id,
          updates: this.noteToSubmit
        }, this.noteToSubmit)
        this.$emit('close')
        if (this.$route.path !== '/home' && navigator.onLine) {
          this.getSingleNote(this._id)
        }
      } catch (err) {
        this.$q.dialog({
          title: 'Error',
          message: this.$t('errorEditNote')
        })
      }
    },
    toggleChapterInput() {
      this.showChapterInput = !this.showChapterInput
    }
  },
  mounted() {
    this.noteToSubmit = Object.assign({}, this.note)
  }
}
</script>
