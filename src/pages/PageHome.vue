<template>
  <q-page>
    <div class="absolute fit">
      <div class="constrain row fit q-pa-md sticky-page-container">
        <div class="col-12 col-sm-8 column full-height">
          <base-scroll-area
            @show-add-note-modal="showAddNote = true"
          >
            <template v-if="!loadingNotes && notes.length">
              <q-infinite-scroll @load="onLoad" :offset="250">
                <note-item
                  v-for="note in notes"
                  :key="note._id"
                  :_id="note._id"
                  :note="note"
                />
                <template v-slot:loading>
                  <div class="row justify-center q-my-md">
                    <q-spinner-dots color="primary" size="40px" />
                  </div>
                </template>
              </q-infinite-scroll>
            </template>

            <template v-else-if="!loadingNotes && totalNotes === 0">
              <no-note-yet
                @show-add-note-modal="showAddNote = true"
              />
            </template>

            <template v-else-if="!loadingNotes && totalNotes > 0 && !notes.length">
              <div class="row justify-center q-mt-lg">
                <q-btn
                  @click="getNotesInit"
                  icon="eva-loader-outline"
                  class="primary-gradient-background"
                >
                  <span class="q-ml-xs">Load More Notes</span>
                </q-btn>
              </div>
            </template>

            <template v-else>
              <page-loader-note />
            </template>
          </base-scroll-area>
        </div>

        <div class="col-sm-4 q-pl-lg large-screen-only">
          <q-card>
            <note-calendar class="side-card" />
          </q-card>
        </div>

        <div class="desktop-sticky-button large-scren-only">
          <q-btn
            @click="showAddNote = true"
            class="primary-gradient-background shadow-5"
            fab
            icon="eva-plus-outline"
          />
        </div>
      </div>
    </div>

    <q-dialog v-model="showAddNote">
      <add-note @close="showAddNote = false" />
    </q-dialog>

<!-- App Install Banner -->
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <q-page-sticky
        expand
        position="bottom"
        v-if="showAppInstallBanner"
        class="banner-container bg-primary"
      >
        <div class="constrain">
          <q-banner inline-actions dense class="bg-primary text-white">
            <q-avatar
              color="white"
              icon="eva-book-open-outline"
              text-color="secondary"
              size="md"
              class="q-mr-xs"
              font-size="22px"
            />
            <b>Install Book Butterfly?</b>
            <template v-slot:action>
              <q-btn
                @click="installApp"
                class="q-px-sm"
                dense
                flat
                label="Yes"
              />
              <q-btn
                @click="showAppInstallBanner = false"
                class="q-px-sm"
                dense
                flat
                label="Later"
              />
              <q-btn
                @click="neverShowAppInstallBanner"
                class="q-px-sm"
                dense
                flat
                label="Never"
              />
            </template>
          </q-banner>
        </div>
      </q-page-sticky>
    </transition>
  </q-page>
</template>

<script>
let deferredPrompt;
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'PageHome',
  components: {
    NoteItem: () => import('../components/Notes/NoteItem'),
    NoNoteYet: () => import('../components/Notes/NoNoteYet'),
    AddNote: () => import('../components/Modals/AddNote'),
    PageLoaderNote: () => import('../components/Layouts/PageLoaderNote'),
    NoteCalendar: () => import('../components/Notes/NoteCalendar'),
    BaseScrollArea: () => import('../components/Layouts/BaseScrollArea')
  },
  data() {
    return {
      showAddNote: false,
      showAppInstallBanner: false
    }
  },
  computed: {
    ...mapState('notes', ['loadingNotes', 'notes']),
    ...mapGetters('auth', ['isLoggedIn']),
    ...mapGetters('notes', ['notes', 'page', 'totalNotes']),
    ...mapGetters('system', ['serviceWorkerSupported']),
    singleNoteLink() {
      return '/notes/' + this.note._id
    },
    backgroundSyncSupported() {
      if ('serviceWorker' in navigator && 'SyncManager' in window)
      return true
      return false
    }
  },
  activated() {
    if(this.isLoggedIn && navigator.onLine) {
      this.loadNotes()
    }
  },
  created() {
    if (navigator.onLine) {
      this.listenForOfflineNoteUploaded()
    }
  },
  mounted() {
    let neverShowAppInstallBanner = this.$q.localStorage.getItem('neverShowAppInstallBanner')

    if (!neverShowAppInstallBanner) {
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault()
        deferredPrompt = e
        setTimeout(() => {
          this.showAppInstallBanner = true
        }, 3000)
      })
    }
  },
  methods: {
    ...mapActions('notes', ['getNotesInit', 'loadMoreNotes', 'getCalendarInfo', 'changeOfflineStatus']),
    async loadNotes() {
      this.getNotesInit()
      this.getCalendarInfo()
    },
    onLoad(index, done) {
      let totalPages = Math.floor(this.totalNotes / 10) + 1
      let currentPage = this.page

      setTimeout(() => {
        if (!navigator.onLine) {
          this.$q.notify({
            message: 'Please reload later when you have internet connection!',
            color: 'deep-orange-6',
            position: 'center',
            timeout: 1500
          })
          done(true)
        } else if (currentPage < totalPages) {
          this.loadMoreNotes()
          done()
        } else if (this.totalNotes > 10) {
          this.$q.notify({
            message: 'No more notes to load!',
            color: 'deep-orange-6',
            position: 'center',
            timeout: 1500
          })
          done(true)
        }
      }, 2000)
    },

    installApp() {
      this.showAppInstallBanner = false
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('accepted')
          this.neverShowAppInstallBanner()
        } else {
          console.log('rejected')
        }
      })
    },

    neverShowAppInstallBanner() {
      this.showAppInstallBanner = false
      this.$q.localStorage.set('neverShowAppInstallBanner', true)
    },

    listenForOfflineNoteUploaded() {
      if (this.serviceWorkerSupported) {
        const channel = new BroadcastChannel('sw-messages')
        channel.addEventListener('message', event => {
          const url = event.data.url
          if(event.data.msg === 'offline-note-uploaded') {
            this.changeOfflineStatus(url)
          }
        })
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.side-card
  @media (max-width: 900px) and (min-width: 600px)
    width: 200px
</style>
