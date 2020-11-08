<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height">
      <div class="constrain">
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-sm-8">
            <the-scroll-area
              @show-add-note-modal="showAddNote = true">
              <template v-if="!loadingNotes && notes.length">
                <div>
                  <q-infinite-scroll @load="onLoad" :offset="250">
                  <!-- <transition-group
                    appear
                    leave-active-class="animated zoomOut"> -->

                    	<note-item
                    	  v-for="note in notes"
                    	  :key="note._id"
                    	  :_id="note._id"
                    	  :note="note"
                    	></note-item>
                      <template v-slot:loading>
                        <div class="row justify-center q-my-md">
                          <q-spinner-dots color="primary" size="40px" />
                        </div>
                      </template>

                  <!-- </transition-group> -->
                  </q-infinite-scroll>
                </div>
              </template>

              <template v-else-if="!loadingNotes && !notes.length">
                <no-note-yet
                  @show-add-note-modal="showAddNote = true"
                />
              </template>

              <template v-else>
                <page-loader-note></page-loader-note>
              </template>
            </the-scroll-area>
          </div>

          <div class="col-sm-4 large-screen-only">
            <q-card>
              <note-calendar  class="side-card"></note-calendar>
            </q-card>
            <q-card>

            </q-card>
          </div>
        </div>

        <q-page-sticky
          :offset="[18, 18]"
          class="add-button bottom-right large-screen-only"
          style="z-index: 3"
        >
          <q-btn
            @click="showAddNote = true"
            class="primary-gradient-background shadow-5"
            fab
            padding="12px"
            icon="eva-plus-outline"
          />
        </q-page-sticky>
      </div>
    </div>

    <q-dialog v-model="showAddNote">
      <add-note @close="showAddNote = false" />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import NoteItem from '../components/Notes/NoteItem'
import NoNoteYet from '../components/Notes/NoNoteYet'
import AddNote from '../components/Modals/AddNote'
import PageLoaderNote from '../components/Layouts/PageLoaderNote'
import NoteCalendar from '../components/Notes/NoteCalendar'
import TheScrollArea from '../components/Layouts/TheScrollArea'

export default {
  name: 'PageHome',
  components: {
    NoteItem,
    NoNoteYet,
    AddNote,
    PageLoaderNote,
    NoteCalendar,
    TheScrollArea
  },
  data() {
    return {
      showAddNote: false,
    }
  },
  computed: {
    ...mapState('notes', ['loadingNotes', 'notes']),
    ...mapGetters('auth', ['isLoggedIn']),
    ...mapGetters('notes', ['notes', 'page', 'totalItems']),
    singleNoteLink() {
      return '/notes/' + this.note._id
    },
  },
  created() {
    let currentPage = this.page
    if(this.isLoggedIn && currentPage === null && this.notes.length === 0) {
     this.loadNotes()
    }
  },
  methods: {
    ...mapActions('notes', ['getNotesInit', 'loadMoreNotes', 'getCalendarInfo']),
    async loadNotes() {
      this.getNotesInit()
      this.getCalendarInfo()
    },
    onLoad(index, done) {
      let totalPages = Math.floor(this.totalItems / 10) + 1
      let currentPage = this.page

      setTimeout(() => {
        if (currentPage < totalPages) {
          this.loadMoreNotes()
          done()
        } else {
          this.$q.notify({
            message: 'No more notes to load!',
            color: 'deep-orange-6',
            position: 'center'
          })
          done(true)
        }
      }, 2000)
    }
  }
}
</script>

<style lang="sass" scoped>
.add-button
  @media (min-width: $breakpoint-sm-min)
    position: absolute

.side-card
  @media (max-width: 900px) and (min-width: 600px)
    width: 200px
</style>
