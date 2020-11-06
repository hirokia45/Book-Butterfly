<template>
  <calendar :attributes="attributes"></calendar>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import Calendar from 'v-calendar/lib/components/calendar.umd'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import PopOver from 'v-calendar/lib/components/popover.umd'

export default {
  components: {
    Calendar,
    DatePicker,
    PopOver,
  },
    computed: {
    ...mapGetters('notes', ['notes']),
    attributes() {
      return [

        ...this.notes.map(note => ({
          dates: note.createdAt,
          highlight: {
            class: 'primary-gradient-background',
            fillMode: 'solid'
          },
          popover: {
            label: note.title
          }
        }))

      ]
    }
  }
}
</script>
