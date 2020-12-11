<template>
  <q-card dark bordered square class="bg-white q-ma-sm" >
    <q-card-section class="text-center q-pb-none q-mt-sm">
      <slot name="icon"></slot>
    </q-card-section>

    <q-card-section class="text-grey-10 text-subtitle1 text-bold text-center q-pt-none q-pb-xs">
      <slot name="title"></slot>
    </q-card-section>

    <q-card-section class="text-grey-10 text-center q-pt-none">
      <slot name="content"></slot>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  mounted() {
    if(this.$q.platform.is.mobile){
      this.flexSpace='q-pa-sm'
    } else{
      this.flexSpace='q-pa-lg'
    }
  }
}
</script>

<style lang="sass" scoped>
.item-icon
  width: 30px
</style>
