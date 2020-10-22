<template>
  <q-card class="note-card q-mb-md" flat bordered>
    <q-card-section text-color="grey-10">
      <div class="text-h4 text-bold text-gochi-hand text-center">Welcome to <br> Book Butterfly!!</div>
      <div class="text-h6 text-gochi-hand text-center">Let's add your first note</div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <div class="text-center">Click the button below or one in the right bottom corner!</div>
      <q-card-actions align="center">
        <q-btn
          @click="showAddNoteModal"
          class="primary-gradient-background q-pa-xs"
          flat
        >Add Your First Note</q-btn>
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  methods: {
    showAddNoteModal() {
      this.$emit('show-add-note-modal')
    }
  }
}
</script>
