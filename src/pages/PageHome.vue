<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height">

      <div class="constrain relative-position">
        <div class="row q-col-gutter-lg">

          <div class="col-12 col-sm-8">
            <q-scroll-area
              :thumb-style="thumbStyle"
              :bar-style="barStyle"
              class="scroll-area-notes"
            >
            	<note-item
            	  v-for="note in notes"
            	  :key="note.id"
                :id="note.id"
            	  :note="note"
            	></note-item>
            </q-scroll-area>
          </div>

          <div class="col-sm-4 large-screen-only">
            <q-card class="side-card">
              <img src="https://cdn.quasar.dev/img/mountains.jpg">

              <q-card-section>
                <div class="text-h6">Our Changing Planet</div>
                <div class="text-subtitle2">by John Doe</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita sunt sequi nobis itaque dignissimos
              </q-card-section>
            </q-card>
          </div>
        </div>

        <q-page-sticky class="add-button bottom-right" :offset="[18, 18]">
          <q-btn fab icon="add" class="primary-gradient-background" />
        </q-page-sticky>
      </div>


    </div>



  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import NoteItem from '../components/NoteItem'
export default {
  name: 'PageHome',
  components: {
    NoteItem
  },
  data () {
    return {
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
    ...mapGetters('notes', ['notes'])
  }
}
</script>

<style lang="sass">
.scroll-area-notes
  height: 85vh

.add-button
  @media (min-width: $breakpoint-sm-min)
    position: absolute

</style>
