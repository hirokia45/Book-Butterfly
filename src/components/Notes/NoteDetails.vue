<template>
  <q-card class="note-card q-mb-md" flat bordered>
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
          :note="note"
          :_id="_id"
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

  </q-card>
</template>

<script>
import NoteHeaderFab from '../Notes/NotesComponents/NoteHeaderFab'

export default {
  components: {
    NoteHeaderFab
  },
  props: ['_id'],
  data() {
    return {
      note: {
        owner: '',
        created: '',
        title: '',
        author: '',
        category: '',
        pageFrom: null,
        pageTo: null,
        comment: ''
      },
    }
  },
  created() {
    this.loadSingleNote(this._id)
  },
  methods: {
    async loadSingleNote(_id) {
      try {
        const response = await this.$axios.get(`${process.env.API}/notes/${_id}`)

        const resData = {
          owner: response.data.note.owner,
          createdAt: response.data.note.createdAt,
          title: response.data.note.title,
          author: response.data.note.author,
          category: response.data.note.category,
          pageFrom: response.data.note.pageFrom,
          pageTo: response.data.note.pageTo,
          comment: response.data.note.comment
        }

        this.note = resData

        if (!response.status === 200) {
          const error = new Error(response.message || "Failed to fetch...");
          throw error;
        }
      } catch (err) {
        this.err = err.message || 'Something went wrong....'
      }
    }
  }
}
</script>
