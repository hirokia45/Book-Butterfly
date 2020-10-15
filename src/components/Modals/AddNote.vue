<template>
  <q-card class="full-height full-width">
    <q-card-section class="row">
      <div class="text-h6">Add Note</div>
      <q-space />
      <q-btn
        v-close-popup
        flat
        round
        icon="eva-close-outline" />
    </q-card-section>

    <q-scroll-area class="scroll-area-modal full-height">
      <form @submit.prevent="submitForm">
        <q-card-section class="q-pt-none">

          <div class="row q-mb-sm">
            <q-input
              outlined
              clearable
              class="col"
              v-model="noteToSubmit.title"
              :rules="[val => !!val || 'Field is required!']"
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
              class="col"
              label="Comment"
              type="textarea"/>
          </div>

          <q-card-actions align="right">
            <q-btn
              type="submit"
              text-color="white"
              class="primary-gradient-background"
              label="SAVE"

            />
          </q-card-actions>
        </q-card-section>
      </form>
    </q-scroll-area>


  </q-card>
</template>

<script>
import { uid } from 'quasar'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      noteToSubmit: {
        id: uid(),
        userName: 'Taro',
        title: '',
        author: '',
        pageFrom: null,
        pageTo: null,
        category: '',
        comment: '',
        date: Date.now()
      }
    }
  },
  methods: {
    ...mapActions('notes', ['addNote']),
    submitForm() {
      this.$refs.title.validate()
      if (!this.$refs.title.hasError) {
        this.submitNote()
      }
    },
    submitNote() {
      this.addNote(this.noteToSubmit)
      this.$emit('close')
    }
  }
}
</script>

<style lang="sass" scoped>
// .scroll-area-modal
//   height: 85vh
</style>
