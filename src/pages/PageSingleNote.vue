<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height">
      <div class="constrain">
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-sm-8">
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

          </div>

          <div class="col-sm-4 large-screen-only">
            <q-list bordered separator class="bg-white">
              <q-toolbar class="bg-deep-orange-4 text-gochi-hand text-grey-10">
                <q-toolbar-title>Your Recent Notes</q-toolbar-title>
              </q-toolbar>

              <side-note-item
                @update-page="changeRoutes"
                v-for="sideNote in noteListLimited"
                :key="sideNote._id"
                :_id="sideNote._id"
                :title="sideNote.title"
                :pageFrom="sideNote.pageFrom"
                :pageTo="sideNote.pageTo"
               />

            </q-list>
          </div>

        </div>

        <q-page-sticky
          :offset="[18, 18]"
          class="add-button bottom-right"
          style="z-index: 3"
        >
          <q-btn
            @click="$router.go(-1)"
            class="grey-gradient-background shadow-5 text-grey-8"
            fab
            icon="eva-arrow-back"
          />
        </q-page-sticky>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SideNoteItem from '../components/Notes/NotesComponents/SideNoteItem'
import NoteHeaderFab from '../components/Notes/NotesComponents/NoteHeaderFab'

export default {
  components: {
    SideNoteItem,
    NoteHeaderFab
  },
  props: ['_id'],
  data() {
    return {
      note: {
        _id: '',
        owner: '',
        createdAt: '',
        title: '',
        author: '',
        category: '',
        pageFrom: null,
        pageTo: null,
        comment: '',
        photo: null
      },
    }
  },
  computed: {
    ...mapGetters('notes', ['notes']),
    noteListLimited() {
      return this.notes.slice(0, 5)
    }
  },
  created() {
    this.loadNotes(),
    this.loadSingleNote(this._id)
  },
  watch: {
    $route(to, from) {
      this.changeRoutes(this.$route.params._id)
    }
  },
  methods: {
    ...mapActions('notes', ['getNotes']),
    async loadNotes() {
      try {
        await this.getNotes()
      } catch (err) {
        this.err = err.message || 'Something went wrong....'
      }
    },
    async loadSingleNote(_id) {
      try {
        const response = await this.$axios.get(`${process.env.API}/notes/${_id}`)

        const resData = {
          _id: response.data.note._id,
          owner: response.data.note.owner,
          createdAt: response.data.note.createdAt,
          title: response.data.note.title,
          author: response.data.note.author,
          category: response.data.note.category,
          pageFrom: response.data.note.pageFrom,
          pageTo: response.data.note.pageTo,
          comment: response.data.note.comment,
          photo: response.data.note.photo
        }

        this.note = resData

        if (!response.status === 200) {
          const error = new Error(response.message || "Failed to fetch...");
          throw error;
        }
      } catch (err) {
        this.err = err.message || 'Something went wrong....'
      }
    },
    changeRoutes(_id) {
      this.$router.push(`/notes/${_id}`).catch(err => {})
      this.loadSingleNote(_id)
    }
  }

}
</script>
