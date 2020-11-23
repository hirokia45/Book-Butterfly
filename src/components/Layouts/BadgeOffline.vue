<template>
  <q-badge
    v-if="note.offline"
    class="absolute-top-right offline-badge"
    color="blue-14"
  >
    Offline Note
  </q-badge>

  <q-badge
    v-else-if="note.offlineUpdate"
    class="absolute-top-right offline-badge"
    color="blue-14"
  >
    Offline Updated
  </q-badge>
</template>

<script>
export default {
  props: ['note']
}
</script>
