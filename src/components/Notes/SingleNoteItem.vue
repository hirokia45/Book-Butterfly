<template>
  <q-card class="note-card q-mb-md" flat bordered>
    <q-item :class="{ 'bg-indigo-2' : note.offline || note.offlineUpdate }">
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

      <q-item-section>
        <q-item-label class="text-bold">{{ note.owner }}</q-item-label>
        <q-item-label caption>
          {{ note.createdAt | displayDate }}
        </q-item-label>
      </q-item-section>

      <q-item-section v-if="!note.offline && !note.offlineUpdate" side>
        <note-header-fab
          :note="note"
          :_id="note._id"
        />
      </q-item-section>

      <badge-offline
        :note="note"
      />
    </q-item>

    <q-separator />

    <q-card-section class="q-gutter-xs">
      <div class="text-bold">{{ note.title }}</div>
      <div
        v-if="note.author"
        class="text-caption"
      >Author: {{ note.author }}</div>
      <div
        v-if="note.chapter"
        class="text-caption"
      >Author: {{ note.chapter }}</div>
      <p
        v-if="note.pageFrom || note.pageTo"
        class="q-mb-none text-caption"
      >
        Page: <span>{{ note.pageFrom }}</span>-<span>{{ note.pageTo }}</span>
      </p>
      <div
        v-if="note.category"
        class="text-caption"
      >
        Category: {{ note.category }}
      </div>
    </q-card-section>

    <q-separator v-if="note.comment" />

    <q-card-section v-if="note.comment" class="comment-whitespace q-px-lg q-pt-none q-pb-md">
      {{ note.comment }}
    </q-card-section>

    <q-card-section v-if="note.photo">
      <img :src="note.photo" class="full-width" />
    </q-card-section>
  </q-card>
</template>

<script>
import { date } from 'quasar'

export default {
  components: {
    NoteHeaderFab: () => import('./NotesComponents/NoteHeaderFab'),
    BadgeOffline: () => import('../Layouts/BadgeOffline')
  },
  props: ['_id', 'note', 'loggedInUser'],
  filters: {
    displayDate(value) {
      const { formatDate } = date
      return date.formatDate (value, 'YYYY M/D h:mmA')
    }
  }
}
</script>
