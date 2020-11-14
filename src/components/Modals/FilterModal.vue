<template>
  <q-card class="q-pa-sm full-width justify-center">
    <modal-header>Search Filter</modal-header>
    <div class="row justify-center q-mb-md">
      <book-search-filter />
    </div>
  </q-card>
</template>

<script>
import ModalHeader from '../Modals/GeneralModalComponents/ModalHeader'
import BookSearchFilter from '../Tools/BookSearchFilter'

export default {
  components: {
    ModalHeader,
    BookSearchFilter
  },
}
</script>
