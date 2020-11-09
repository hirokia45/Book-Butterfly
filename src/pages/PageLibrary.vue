<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height">
      <div class="constrain full-height">
      	  <q-tabs
      	    v-model="tab"
      	    dense
      	    inline-label
      	    class="text-grey justify-center"
      	    active-color="primary"

      	    indicator-color="transparent"
      	  >
      	    <q-tab name="search" icon="eva-search-outline" label="Search" />
      	    <q-tab name="bookshelf" icon="eva-book-outline" label="Bookshelf" />

      	  </q-tabs>

      	  <q-tab-panels v-model="tab" class="panel-height" animated>
      	    <q-tab-panel class="bg-brown-1 q-pa-xs full-height" name="search">
      	      <book-search />
      	    </q-tab-panel>

      	    <q-tab-panel name="bookshelf">
      	      <div class="text-h6">Alarms</div>
      	      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      	    </q-tab-panel>
      	  </q-tab-panels>

          </div>
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
      tab: 'search'
    }
  }

}
</script>

<style lang="sass" scoped>
.panel-height
  height: 78vh
</style>
