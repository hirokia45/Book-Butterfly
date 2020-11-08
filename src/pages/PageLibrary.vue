<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height">
      <q-card class="full-height">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="mails" label="Mails" />
          <q-tab name="alarms" label="Alarms" />

        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="mails">
            <book-search />
          </q-tab-panel>

          <q-tab-panel name="alarms">
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>

    </div>
  </q-page>
</template>

<script>
import BookSearch from '../components/Library/BookSearch'
export default {
  name: 'PageLibrary',
  components: {
    BookSearch
  },
  data () {
    return {
      tab: 'mails'
    }
  }

}
</script>
