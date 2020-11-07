<template>
  <q-layout container class="scroll-area-notes">
        <q-scroll-area
          :thumb-style="thumbStyle"
          class="scroll-area-notes"
          ref="scrollArea"
        >
        <q-scroll-observer @scroll="onScroll" />
          <slot></slot>

          <q-page-sticky
            v-show="addModalFabIsVisible"
            class="add-button small-screen-only"
            :class="{ 'add-height': scrollFabIsVisible }"
            style="z-index: 3"
          >
            <q-btn
              @click="showAddNoteModal"
              class="primary-gradient-background shadow-5"
              fab
              padding="12px"
              icon="eva-plus-outline"
            />
          </q-page-sticky>

          <transition
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut">
            <q-page-sticky
              v-show="scrollFabIsVisible"
              style="z-index: 3"
              position="bottom-right" :offset="[8, 18]">
              <q-btn
                @click="scrollToTop"
                class="cyan-gradient-background text-grey-4 shadow-5"
                fab
                padding="12px"
                icon="eva-arrow-upward-outline"
              />
            </q-page-sticky>
          </transition>

        </q-scroll-area>
  </q-layout>

</template>

<script>
export default {
  data() {
    return {
      scrollFabIsVisible: false,
      addModalFabIsVisible: false,
      scrollInfo: {},
      thumbStyle: {
        right: '0px',
        borderRadius: '5px',
        backgroundColor: '#ff9800',
        width: '5px',
        opacity: 0.55
      }
    }
  },
  methods: {
    checkIfItsHome() {
      if (this.$route.path === "/home") {
        this.addModalFabIsVisible = true
      }
    },
    showAddNoteModal() {
      this.$emit('show-add-note-modal')
    },
    scrollToTop() {
      this.$refs.scrollArea.setScrollPosition(0, 350)
    },
    onScroll(info) {
      if (info.position > 600) {
      this.scrollFabIsVisible = true
      } else {
        this.scrollFabIsVisible = false
      }
    },
  },
  created() {
    this.checkIfItsHome()
  }
}
</script>

<style lang="sass" scoped>
.scroll-area-notes
  height: 85vh

.add-button
  position: fixed
  bottom: 28px
  right: 8px

.add-height
  position: fixed
  bottom: 78px
  right: 8px


</style>
