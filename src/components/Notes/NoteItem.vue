<template>
  <q-card
    tabindex="0"
    class="note-card q-mb-md"
    bordered
    flat
  >
    <div @click="toSingleNotePage($event)" class="cursor-pointer">

      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img :src="loggedInUser.avatar">
          </q-avatar>
        </q-item-section>

        <q-item-section class="row justify-center">
          <q-item-label class="text-bold">{{ note.owner }}</q-item-label>
          <q-item-label
            class="q-mr-sm q-mt-xs column center"
            caption
          >
            {{ note.createdAt | displayDate }}
          </q-item-label>

        </q-item-section>


        <q-item-section side>
          <note-header-fab
            :_id="_id"
            :note="note"
          />
        </q-item-section>

      </q-item>

      <q-separator />

      <q-card-section>
        <div class="text-bold">{{ note.title }}</div>
        <p
          v-if="note.chapter"
          class="q-mb-none text-caption"
        >{{ note.chapter }}
        </p>
        <p
          v-if="note.pageFrom || note.pageTo "
          class="q-mb-none text-caption"
        >
          Page: <span>{{ note.pageFrom }}</span>-<span>{{ note.pageTo }}</span>
        </p>
      </q-card-section>

      <q-separator v-if="note.comment" />

      <q-card-section v-if="note.comment"       class="comment-whitespace q-py-none q-px-lg"
      >
        {{ note.comment | truncate(500) }}
      </q-card-section>

      <q-card-section v-if="note.photo">
        <img :src="note.photo" class="full-width" />
      </q-card-section>
    </div>

  </q-card>

</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { date } from 'quasar'
import NoteHeaderFab from './NotesComponents/NoteHeaderFab'

export default {
  components: {
    NoteHeaderFab
  },
  props: ['note', '_id'],
  computed: {
    ...mapGetters('auth', ['loggedInUser'])
  },
  methods: {
    toSingleNotePage(event) {
      this.$router.push(`/notes/${this._id}`)
    },
  },
  filters: {
    displayDate(value) {
      const { formatDate } = date
      return date.formatDate (value, 'YYYY M/D h:mmA')
    },
    truncate(string, val) {
      return string.substring(0, val) + '...'
    }
  },

}
</script>
