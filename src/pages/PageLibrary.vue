<template>
  <q-page>
    <div class="absolute fit">
      <div class="q-pa-md constrain fit column row">
				<q-tabs
					v-model="tab"
					dense
					inline-label
					align="justify"
					class="text-grey col-1"
					active-color="primary"
					indicator-color="transparent"
				>
					<q-tab name="search" icon="eva-search-outline" label="Search" />
					<q-tab name="bookshelf" icon="eva-book-outline" label="Bookshelf" />
					<q-tab name="archive" icon="eva-archive-outline" label="Archive" />
				</q-tabs>

				<q-tab-panels v-model="tab" class="full-height col" animated>
					<q-tab-panel class="bg-brown-1 bg-brown-1 q-px-xs q-pb-xs q-pt-none fit" name="search">
						<book-search
						/>
					</q-tab-panel>

					<q-tab-panel class="bg-brown-1 bg-brown-1 q-px-xs q-pb-xs q-pt-none fit" name="bookshelf">
						<book-shelf
						/>
					</q-tab-panel>

					<q-tab-panel class="bg-brown-1 q-px-xs q-pb-xs q-pt-none fit" name="archive">
						<the-archive
						/>
					</q-tab-panel>
				</q-tab-panels>
			</div>
		</div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'PageLibrary',
  components: {
		BookSearch: () => import('../components/Library/BookSearch'),
		BookShelf: () => import('../components/Library/BookShelf'),
		TheArchive: () => import('../components/Library/TheArchive')
  },
  data () {
    return {
      tab: 'bookshelf'
    }
  },
  methods: {
    ...mapActions('books', ['resetSearch', 'deleteBooks'])
  },
  beforeDestroy() {
    this.resetSearch()
    this.deleteBooks()
  }
}
</script>
