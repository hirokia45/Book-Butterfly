<template>
  <q-card class="full-width">
    <modal-header>Edit Note</modal-header>

    <form @submit.prevent="submitForm">
      <q-card-section class="q-pt-none">

        <div class="row q-mb-sm">
          <q-input
            outlined
            clearable
            class="col"
            v-model="noteToSubmit.title"
            :rules="[val => !!val || 'Field is required!']"
            autofocus
            ref="title"
            label="Book Title" />
        </div>

        <div class="row q-mb-sm">
          <q-input
            outlined
            clearable
            class="col"
            v-model="noteToSubmit.author"
            label="Author" />
        </div>

        <div class="row q-mb-sm">
          <q-input
            type="number"
            class="col-5"
            outlined
            clearable
            v-model="noteToSubmit.pageFrom"
            label="From" />
          <q-space />
          <span></span>
          <q-input
            type="number"
            class="col-5"
            outlined
            clearable
            v-model="noteToSubmit.pageTo"
            label="To" />
        </div>

        <div class="row q-mb-sm">
          <q-input
            outlined
            clearable
            class="col"
            v-model="noteToSubmit.category"
            label="Category" />
        </div>

        <div class="row q-mb-sm">
          <q-input
            v-model="noteToSubmit.comment"
            outlined
            clearable
            class="col"
            label="Comment"
            type="textarea"/>
        </div>

        <modal-button></modal-button>
      </q-card-section>
    </form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'
import ModalHeader from './ModalComponents/ModalHeader'
import ModalButton from './ModalComponents/ModalButton'

export default {
  components: {
    ModalHeader,
    ModalButton
  },
  props: ['note', '_id'],
  data() {
    return {
      noteToSubmit: {

      },
    }
  },
  methods: {
    ...mapActions('notes', ['updateNote','getSingleNote']),
    submitForm() {
      this.$refs.title.validate()
      if (!this.$refs.title.hasError) {
        this.submitNote()
      }
    },
    submitNote() {
      this.updateNote({
        _id: this._id,
        updates: this.noteToSubmit
      }, this.noteToSubmit)
      this.$emit('close')
      if (this.$route.path !== '/home') {
        this.getSingleNote(this._id)
      }
    },
  },
  mounted() {
    this.noteToSubmit = Object.assign({}, this.note)
  }
}
</script>

<style lang="sass" scoped>

</style>
