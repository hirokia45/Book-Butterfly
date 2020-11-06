<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height">
      <div class="constrain">
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-sm-8">
            <the-scroll-area>


                <q-card class="note-card q-mb-md" flat bordered>
                  <q-item>
                    <q-item-section avatar>
                      <q-avatar>
                        <img :src="loggedInUser.avatar">
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label class="text-bold">{{ owner }}</q-item-label>
                      <q-item-label caption>
                        {{ createdAt | displayDate }}
                      </q-item-label>
                    </q-item-section>

                    <q-item-section side>
                      <note-header-fab
                        :note="singleNote"
                        :_id="_id"
                      />
                    </q-item-section>
                  </q-item>

                  <q-separator />

                  <q-card-section>
                    <div class="text-bold">{{ title }}</div>
                    <div
                      v-if="author"
                      class="text-caption"
                    >Author: {{ author }}</div>
                    <p
                      v-if="pageFrom || pageTo"
                      class="q-mb-none text-caption"
                    >
                      Page: <span>{{ pageFrom }}</span>-<span>{{ pageTo }}</span>
                    </p>
                    <div
                      v-if="category"
                      class="text-caption"
                    >
                      Category: {{ category }}
                    </div>
                  </q-card-section>

                  <q-separator v-if="comment" />

                  <q-card-section v-if="comment" >
                    {{ comment }}
                  </q-card-section>

                  <q-card-section v-if="photo">
                    <img :src="photo" class="full-width" />
                  </q-card-section>

                </q-card>

            </the-scroll-area>

          </div>

          <div class="col-sm-4 large-screen-only">
            <q-list bordered separator class="bg-white rounded-borders shadow-2">
              <q-toolbar class="bg-deep-orange-4 text-gochi-hand text-grey-10 list-header">
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
import { date } from 'quasar'
import SideNoteItem from '../components/Notes/NotesComponents/SideNoteItem'
import NoteHeaderFab from '../components/Notes/NotesComponents/NoteHeaderFab'
import TheScrollArea from '../components/Layouts/TheScrollArea'

export default {
  components: {
    SideNoteItem,
    NoteHeaderFab,
    TheScrollArea
  },
  props: ['_id'],
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters('notes', ['notes', 'singleNote']),
    ...mapGetters('auth', ['loggedInUser']),
    owner() {
      return this.singleNote.owner
    },
    createdAt() {
      return this.singleNote.createdAt
    },
    title() {
      return this.singleNote.title
    },
    author() {
      return this.singleNote.author
    },
    category() {
      return this.singleNote.category
    },
    pageFrom() {
      return this.singleNote.pageFrom
    },
    pageTo() {
      return this.singleNote.pageTo
    },
    comment() {
      return this.singleNote.comment
    },
    photo() {
      return this.singleNote.photo
    },

    noteListLimited() {
      return this.notes.slice(0, 5)
    }
  },
  created() {
    this.loadNotes(),
    this.loadSingleNote()
  },
  watch: {
    $route(to, from) {
      this.changeRoutes(this.$route.params._id)
    }
  },
  methods: {
    ...mapActions('notes', ['getNotes', 'getSingleNote']),
    async loadNotes() {
      try {
        await this.getNotes()
      } catch (err) {
        this.err = err.message || 'Something went wrong....'
      }
    },
    async loadSingleNote(this_id) {
      await this.getSingleNote(this._id)
    },
    changeRoutes(_id) {
      this.$router.push(`/notes/${_id}`).catch(err => {})
      this.loadSingleNote(_id)
    },
  },
  filters: {
    displayDate(value) {
      const { formatDate } = date
      return date.formatDate (value, 'YYYY M/D h:mmA')
    }
  }
}
</script>

<style lang="sass" scoped>
  .list-header
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

</style>
