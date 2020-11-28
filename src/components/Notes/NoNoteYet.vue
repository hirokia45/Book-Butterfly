<template>
  <q-card class="note-card q-mb-md" flat bordered>
    <q-card-section text-color="grey-10">
      <div class="text-h4 text-bold text-gochi-hand text-center">{{$t('firstNoteMessage1')}}<br> {{$t('firstNoteMessage2')}}</div>
      <div class="text-h6 text-gochi-hand text-center">{{$t('firstNoteMessage3')}}</div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <div class="text-center">{{$t('firstNoteMessage4')}}</div>
      <q-card-actions align="center">
        <q-btn
          @click="showAddNoteModal"
          class="primary-gradient-background q-pa-xs"
          flat
        >{{$t('firstNoteButton')}}</q-btn>
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
  },
}
</script>
