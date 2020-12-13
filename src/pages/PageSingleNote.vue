<template>
  <q-page>
    <div class="absolute fit">
      <div class="constrain fit q-pa-lg row sticky-page-container">
        <div class="col-12 col-sm-8 column full-height">
          <base-scroll-area>
            <single-note-item
              :note="singleNote"
              :loggedInUser="loggedInUser"
            />
          </base-scroll-area>
        </div>

        <div class="col-sm-4 large-screen-only q-pl-lg">
          <q-list bordered separator class="bg-white rounded-borders shadow-2">
            <q-toolbar class="bg-deep-orange-4 text-gochi-hand text-grey-10 list-header">
              <q-toolbar-title>{{$t('recentNotes')}}</q-toolbar-title>
            </q-toolbar>

            <side-note-item
              @update-page="changeRoutes"
              v-for="sideNote in fiveNewestNotes"
              :key="sideNote._id"
              :_id="sideNote._id"
              :title="sideNote.title"
              :chapter="sideNote.chapter"
              :pageFrom="sideNote.pageFrom"
              :pageTo="sideNote.pageTo"
              />

          </q-list>
        </div>

        <div class="fab-sticky-button">
          <q-btn
            @click="$router.go(-1)"
            fab
            class="grey-gradient-background shadow-5 text-grey-8"
            icon="eva-arrow-back"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    SideNoteItem: () => import('../components/Notes/NotesComponents/SideNoteItem'),
    BaseScrollArea: () => import('../components/Layouts/BaseScrollArea'),
    SingleNoteItem: () => import('../components/Notes/SingleNoteItem')
  },
  props: ['_id'],
  computed: {
    ...mapGetters('notes', ['fiveNewestNotes', 'singleNote', 'notes']),
    ...mapGetters('auth', ['loggedInUser']),
  },
  created() {
    if (navigator.onLine) {
      this.loadNotes(),
      this.loadSingleNote()
    }
    else if (!navigator.onLine) {
      this.loadOfflineSingleNote()
    }
  },
  watch: {
    $route(to, from) {
      this.changeRoutes(this.$route.params._id)
    }
  },
  methods: {
    ...mapActions('notes', ['getFiveNewestNotes', 'getSingleNote', 'getOfflineSingleNote']),
    async loadNotes() {
      try {
        await this.getFiveNewestNotes()
      } catch (err) {
        console.error(err)
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
    loadOfflineSingleNote() {
      this.getOfflineSingleNote(this._id)
    }
  }
}
</script>

<style lang="sass" scoped>
.list-header
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
</style>
