<template>
  <q-page class="constrain q-pa-md">

      <note-item
        v-for="note in notes"
        :key="note.id"
        :id="note.id"
        :userName="note.userName"
        :date="note.date"
        :title="note.title"
        :author="note.author"
        :category="note.category"
        :pageFrom="note.pageFrom"
        :pageTo="note.pageTo"
        :comment="note.comment"
      ></note-item>

  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import NoteItem from '../components/NoteItem'
export default {
  name: 'PageHome',
  components: {
    NoteItem
  },
  computed: {
    ...mapGetters('notes', ['notes'])
  }
}
</script>
