<template>
  <q-scroll-observer @scroll="onScroll">
  <transition
  appear
  enter-active-class="animated fadeIn"
  leave-active-class="animated fadeOut">

    <slot v-show="visible" name="fade"></slot>
  </transition>
  </q-scroll-observer>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  },
  created() {
    window.addEventListener("scroll", this.onScroll)
  },
  destroyed() {
    window.addEventListener("scroll", this.onScroll)
  },
  methods: {
    handleScroll() {
      if (!this.visible) {
        let top = this.$el.getBoundingClientRect().top
        console.log(top);
        this.visible = top < window.innerHeight + 100
      }
    },
    onScroll(info) {
      console.log(info);
      const height = document.getElementById('scrollArea').clientHeight
      let top = this.scopedSlots
      console.warn(this)
        console.log('top', top);
      if (!this.visible) {

      }
    }
  }
}
</script>
