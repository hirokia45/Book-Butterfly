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
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-bold">{{ note.owner }}</q-item-label>
          <q-item-label caption>
            {{ note.createdAt }}
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
        <div
          v-if="note.author"
          class="text-caption"
        >Author: {{ note.author }}</div>
        <p
          v-if="note.pageFrom || note.pageTo "
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

      <q-card-section v-if="note.comment" >
        {{ note.comment }}
      </q-card-section>
    </div>

  </q-card>

</template>

<script>
import NoteHeaderFab from './NotesComponents/NoteHeaderFab'

export default {
  components: {
    NoteHeaderFab
  },
  props: ['note', '_id'],
  methods: {
    toSingleNotePage(event) {
      this.$router.push(`/notes/${this._id}`)
    },
  },
}
</script>
