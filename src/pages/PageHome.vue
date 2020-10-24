<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height">
      <div class="constrain">
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-sm-8">
            <q-scroll-area
              :thumb-style="thumbStyle"
              :bar-style="barStyle"
              class="scroll-area-notes"
            >
                <div v-if="!Object.keys(notes).length">
                  <no-note-yet
                    @show-add-note-modal="showAddNote = true"
                  />
                </div>
                <div v-else>
                  <transition-group
                    appear
                    leave-active-class="animated zoomOut">
                    <note-item
                      v-for="note in notes"
                      :key="note._id"
                      :_id="note._id"
                      :note="note"
                    ></note-item>
                  </transition-group>
                </div>

            </q-scroll-area>
          </div>

          <div class="col-sm-4 large-screen-only">
            <q-card class="side-card">
              <img src="https://cdn.quasar.dev/img/mountains.jpg" />

              <q-card-section>
                <div class="text-h6">Our Changing Planet</div>
                <div class="text-subtitle2">by John Doe</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Expedita sunt sequi nobis itaque dignissimos
              </q-card-section>
            </q-card>
          </div>
        </div>

        <q-page-sticky
          :offset="[18, 18]"
          class="add-button bottom-right"
          style="z-index: 3"
        >
          <q-btn
            @click="showAddNote = true"
            class="primary-gradient-background shadow-5"
            fab
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
import { mapGetters, mapActions } from 'vuex'
import NoteItem from '../components/Notes/NoteItem'
import NoNoteYet from '../components/Notes/NoNoteYet'
import AddNote from '../components/Modals/AddNote'

export default {
  name: 'PageHome',
  components: {
    NoteItem,
    NoNoteYet,
    AddNote
  },
  data() {
    return {
      showAddNote: false,
      thumbStyle: {
        right: '-5px',
        borderRadius: '5px',
        backgroundColor: '#ff9800',
        width: '5px',
        opacity: 0.55
      },

      barStyle: {
        right: '-6px',
        borderRadius: '9px',
        backgroundColor: '#ff9800',
        width: '6px',
        opacity: 0.2
      }
    }
  },
  computed: {
    ...mapGetters('notes', ['notes']),
    singleNoteLink() {
      console.log(this.note._id);
      return '/notes/' + this.note._id
    }
  },
  created() {
    this.loadNotes()
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
  }
}
</script>

<style lang="sass" scoped>
.scroll-area-notes
  height: 85vh

.add-button
  @media (min-width: $breakpoint-sm-min)
    position: absolute
</style>
