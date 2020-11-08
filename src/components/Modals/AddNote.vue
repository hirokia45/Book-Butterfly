<template>
  <q-card class="full-width">
    <modal-header>Add Note</modal-header>

    <form @submit.prevent="submitForm">
      <q-card-section class="q-pt-none">

        <modal-title
          :title.sync="noteToSubmit.title"
          ref="modalTitle"
        />

        <modal-author :author.sync="noteToSubmit.author"/>

        <modal-pages
          :pageFrom.sync="noteToSubmit.pageFrom"
          :pageTo.sync="noteToSubmit.pageTo"
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
  data() {
    return {
      noteToSubmit: {
        title: '',
        author: '',
        pageFrom: null,
        pageTo: null,
        category: '',
        comment: '',
      },
    }
  },
  methods: {
    ...mapActions('notes', ['addNote']),
    async submitNote() {
      try {
        await this.addNote(this.noteToSubmit)
        await this.$emit('close')
      } catch (err) {
        this.$q.dialog({
          title: 'Error',
          message: 'Could not add new note'
        })
      }
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
