<template>
  <div class="fit column constrain-more">
    <div class="row justify-center col-1 q-mb-xs">
      <the-sort />
    </div>

    <base-scroll-area
      v-if="sortedArchives.length > 0"
      class="full-height col"
    >
      <q-list bordered separator>
        <archive-item
          v-for="archive in sortedArchives"
          :key="archive._id"
          :_id="archive._id"
          :archive="archive"
        />
      </q-list>
    </base-scroll-area>

  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'

export default {
  components: {
    ArchiveItem: () => import('../Library/ArchiveItem'),
    TheSort: () => import('../Tools/TheSort'),
    BaseScrollArea: () => import('../Layouts/BaseScrollArea')
  },
  computed: {
    ...mapGetters('books', ['sortedArchives'])
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
