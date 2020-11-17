<template>
  <div class="scroll-container fit">
    <q-scroll-area
      :thumb-style="thumbStyle"
      ref="scrollArea"
      class="fit"
    >
    <q-scroll-observer @scroll="onScroll" />
      <slot></slot>

      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut">
        <div
          v-if="addModalFabIsVisible"
          class="small-screen-only"
          :class="!scrollFabIsVisible ? 'add-button' : 'extra-height'"
        >
          <q-btn
            @click="showAddNoteModal"
            class="primary-gradient-background shadow-5"
            fab
            padding="12px"
            icon="eva-plus-outline"
          />
        </div>
      </transition>

      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut">
        <div
          v-show="scrollFabIsVisible"
          class="sticky-button"
        >
          <q-btn
            @click="scrollToTop"
            class="cyan-gradient-background text-grey-4 shadow-5"
            fab
            padding="12px"
            icon="eva-arrow-upward-outline"
          />
        </div>
      </transition>
    </q-scroll-area>
  </div>
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
    addButtonPosition() {
      if (!!this.scrollFabIsVisible) {
        return 'extra-height'
      } else {
        return 'add-button'
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
.scroll-container
  transform: translateZ(0)

.sticky-button
  position: fixed
  z-index: 3
  bottom: 10px
  right: 6px

.add-button
  position: fixed
  z-index: 3
  bottom: 10px
  right: 6px

.extra-height
  position: fixed
  z-index: 3
  bottom: 76px
  right: 6px
</style>
