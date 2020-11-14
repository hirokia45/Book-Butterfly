<template>
  <div class="constrain-more">
    <div class="row justify-center">
      <the-sort
        :books="archives"
      />
    </div>

    <the-scroll-area v-if="archives.length > 0">
      <q-list bordered separator>
        <archive-item
          v-for="archive in archives"
          :key="archive._id"
          :_id="archive._id"
          :archive="archive"
        />
      </q-list>
    </the-scroll-area>

  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
import ArchiveItem from '../Library/ArchiveItem'
import TheSort from '../Tools/TheSort'
import TheScrollArea from '../Layouts/TheScrollArea'

export default {
  components: {
    ArchiveItem,
    TheSort,
    TheScrollArea
  },
  computed: {
    ...mapGetters('books', ['archives'])
  },
  methods: {
    ...mapActions('books', ['setTab'])
  },
  created() {
    let tab = 'archives'
    this.setTab(tab)
  }
}
</script>
