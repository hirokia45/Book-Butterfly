<template>
  <q-card dark bordered square class="bg-white q-ma-sm" >
    <q-card-section class="text-center q-pb-none q-mt-sm">
      <slot name="icon"></slot>
    </q-card-section>

    <q-card-section class="text-grey-10 text-subtitle1 text-bold text-center q-pt-none q-pb-xs">
      <slot name="title"></slot>
    </q-card-section>

    <q-card-section class="text-center q-pa-none">
      <q-btn
        @click="toggleContent"
        v-if="!isVisible"
        color="grey-10"
        flat
        icon="eva-arrow-down-outline"
      />
      <q-btn
        @click="toggleContent"
        v-else
        color="grey-10"
        flat
        icon="eva-arrow-up-outline"
      />
    </q-card-section>

    <transition
      appear
      enter-active-class="animated fadeIn"
    >
      <q-card-section
        v-show="isVisible"
        v-model="isVisible"
        class="text-grey-10 text-center q-pt-none"
      >
        <slot name="content"></slot>
      </q-card-section>
    </transition>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false
    }
  },
  mounted() {
    if(this.$q.platform.is.mobile){
      this.flexSpace='q-pa-sm'
    } else{
      this.flexSpace='q-pa-lg'
    }
  },
  methods: {
    toggleContent() {
      this.isVisible = !this.isVisible
    }
  }
}
</script>

<style lang="sass" scoped>
.item-icon
  width: 30px
</style>
