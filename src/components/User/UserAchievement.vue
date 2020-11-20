<template>
  <q-card class="full-height">
    <q-tabs
      v-model="tab"
      dense
      inline-label
      align="justify"
      class="text-grey"
      active-color="primary"
      indicator-color="transparent"
    >
      <q-tab name="note" icon="eva-clipboard-outline" label="Notes" />
      <q-tab name="book" icon="eva-book-outline" label="Books" />
    </q-tabs>

    <div class="q-gutter-y-sm">
      <q-tab-panels
        v-model="tab"
        animated
      >
        <q-tab-panel name="note" class="row q-pa-none justify-center">
          <achievement-tab-panel
            :totalNotes="totalNotes"
            :tab="tab"
          />
        </q-tab-panel>

        <q-tab-panel name="book" class="row q-pa-none justify-center">
          <achievement-tab-panel
            :totalBooksCompleted="totalBooksCompleted"
            :tab="tab"
          />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {
    AchievementTabPanel: () => import('./AchievementTabPanel')
  },
  data() {
    return {
      tab: 'note'
    }
  },
  computed: {
    ...mapGetters('notes', ['totalNotes']),
    ...mapGetters('books', ['totalBooksCompleted'])
  }
}
</script>
