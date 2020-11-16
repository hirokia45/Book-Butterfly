<template>
  <q-layout container :class="scrollAreaSize">
        <q-scroll-area
          :thumb-style="thumbStyle"
          :class="scrollAreaSize"
          ref="scrollArea"
        >
        <q-scroll-observer @scroll="onScroll" />
          <slot></slot>

          <q-page-sticky
            v-show="addModalFabIsVisible"
            class="small-screen-only"
            :class="smallScreenAddButton"
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
              :class="scrollToTopButton">
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
  computed: {
    scrollAreaSize() {
      if (this.$route.path === "/library" && window.innerWidth < 600) {
        return 'scroll-area-books'
      } else if (this.$route.path === "/library" && window.innerWidth > 600) {
        return 'scroll-area-books-more'
      } else {
        return 'scroll-area-notes'
      }
    },
    smallScreenAddButton() {
      if (window.innerWidth < 361 && this.scrollFabIsVisible) {
        return 'smallest-add-height'
      } else if (this.scrollFabIsVisible) {
        return 'add-height'
      } else if (window.innerWidth < 361) {
        return 'smallest-add-button'
      } else {
        return 'add-button'
      }
    },
    scrollToTopButton() {
      if (window.innerWidth < 361) {
        console.log('smallest window');
        return 'smallest-window-position-scroll'
      } else {
        return 'regular-position'
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
    // this.checkIfItsLibrary()
  }
}
</script>

<style lang="sass" scoped>
.scroll-area-notes
  height: 85vh

.scroll-area-books
  height: 70vh

.scroll-area-books-more
  height: 70vh

.add-button
  position: fixed
  bottom: 28px
  right: 8px

.smallest-add-button
  position: fixed
  bottom: 35px
  right: 1px

.add-height
  position: fixed
  bottom: 78px
  right: 8px

.smallest-add-height
  position: fixed
  bottom: 94px
  right: 1px

.regular-position
  position: fixed
  bottom: 18px
  right: 8px

.smallest-window-position-scroll
  position: fixed
  bottom: 35px
  right: 1px

</style>
