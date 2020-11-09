<template>
  <q-card-section class="row">
    <div class="text-h6 absolute-center"><slot></slot></div>
    <q-space />
    <q-btn
      v-close-popup
      flat
      round
      icon="eva-close-outline" />
  </q-card-section>
</template>
