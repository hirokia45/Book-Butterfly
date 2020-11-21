<template>
  <q-card
    tabindex="0"
    class="note-card q-mb-md"
    :class="{ 'bg-indigo-2' : note.offline || note.offlineUpdate }"
    bordered
    flat
  >
    <div @click="toSingleNotePage($event)" class="cursor-pointer">
      <q-badge
        v-if="note.offline"
        class="absolute-top-right offline-badge"
        color="blue-14"
      >
        Offline Note
      </q-badge>

      <q-badge
        v-if="note.offlineUpdate"
        class="absolute-top-right offline-badge"
        color="blue-14"
      >
        Offline Updated
      </q-badge>

      <q-badge
        v-if="note.deleteLater"
        class="absolute-top-right offline-badge"
        color="red-10"
      >
        Will Be Deleted
      </q-badge>

      <q-item>
        <q-item-section avatar>
          <template v-if="loggedInUser.avatar">
            <q-avatar>
              <img :src="loggedInUser.avatar">
            </q-avatar>
          </template>
          <template v-else>
            <q-avatar>
              <img src="../../assets/default-avatar.png">
            </q-avatar>
          </template>

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

      <q-card-section v-if="note.comment"
        class="comment-whitespace q-py-none q-px-lg"
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
import { mapGetters } from 'vuex'
import { date } from 'quasar'

export default {
  components: {
    NoteHeaderFab: () => import('./NotesComponents/NoteHeaderFab')
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
      if (string > 500) {
        return string.substring(0, val) + '...'
      } else {
        return string
      }
    }
  },
}
</script>

<style lang="stylus" scoped>
.offline-badge
  border-top-left-radius: 0
  border-bottom-right-radius: 0
</style>
