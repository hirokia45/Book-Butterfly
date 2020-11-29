<template>
  <q-badge
    v-if="note.offline"
    class="absolute-top-right offline-badge"
    style="right: 6px; top: 6px;"
    color="blue-14"
  >
    <q-icon name="eva-wifi-off-outline" color="white" class="q-mr-xs" />
    {{$t('offlineNote')}}
  </q-badge>

  <q-badge
    v-else-if="note.offlineUpdate"
    class="absolute-top-right offline-badge"
    color="blue-14"
  >
    <q-icon name="eva-wifi-off-outline" color="white" class="q-mr-xs" />
    {{$t('offlineUpdated')}}
  </q-badge>
</template>

<script>
export default {
  props: ['note']
}
</script>

<style lang="sass" scoped>
.offline-badge
  right: 6px
  top: 6px
</style>
