<template>
  <div class="constrain-more">
    <div class="row justify-center">
      <!-- <the-search-bar /> -->
      <q-btn
        class="q-ml-sm"
        color="grey-10"
        flat
        icon="eva-trash-2-outline"
        round
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
import { mapGetters } from 'vuex'
import ArchiveItem from '../Library/ArchiveItem'
import TheScrollArea from '../Layouts/TheScrollArea'

export default {
  components: {
    ArchiveItem,
    TheScrollArea
  },
  computed: {
    ...mapGetters('books', ['archives'])
  }
}
</script>
