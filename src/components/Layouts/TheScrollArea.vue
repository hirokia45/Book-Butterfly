<template>
  <q-scroll-area
    :thumb-style="thumbStyle"
    :bar-style="barStyle"
    class="scroll-area-notes"
  >
    <slot></slot>
  </q-scroll-area>
</template>

<script>
export default {
  data() {
    return {
      showAddNote: false,
      thumbStyle: {
        right: '-5px',
        borderRadius: '5px',
        backgroundColor: '#ff9800',
        width: '5px',
        opacity: 0.55
      },

      barStyle: {
        right: '-6px',
        borderRadius: '9px',
        backgroundColor: '#ff9800',
        width: '6px',
        opacity: 0.2
      }
    }
  },
}
</script>

<style lang="sass" scoped>
.scroll-area-notes
  height: 85vh

</style>
