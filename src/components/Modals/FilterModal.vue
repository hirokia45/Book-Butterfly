<template>
  <q-card class="q-pa-sm full-width justify-center">
    <modal-header>Search Filter</modal-header>
    <div class="row justify-center q-mb-md">
      <book-search-filter />
    </div>
  </q-card>
</template>

<script>
export default {
  components: {
    ModalHeader: () => import('../Modals/GeneralModalComponents/ModalHeader'),
    BookSearchFilter: () => import('../Tools/BookSearchFilter')
  },
}
</script>
