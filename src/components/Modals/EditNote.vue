<template>
  <q-card class="full-width">
    <modal-header>Edit Note</modal-header>

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
  props: ['note', '_id'],
  data() {
    return {
      noteToSubmit: {},
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
        if (this.$route.path !== '/home') {
          this.getSingleNote(this._id)
        }
      } catch (err) {
        this.$q.dialog({
          title: 'Error',
          message: 'Could not edit the note'
        })
      }
    }
  },
  mounted() {
    this.noteToSubmit = Object.assign({}, this.note)
  }
}
</script>

<style lang="sass" scoped>

</style>
