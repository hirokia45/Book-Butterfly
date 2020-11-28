<template>
  <div class="row q-mb-md justify-center">
    <q-input
      type="number"
      rounded
      outlined
      clearable
      :value="pageFrom"
      :class="pageInputSize"
      @input="$emit('update:pageFrom', $event)"
      :label="$t('pageFrom')" />

    <div class="text-h4 column center"> ~ </div>
    <q-input
      type="number"
      rounded
      outlined
      clearable
      :value="pageTo"
      :class="pageInputSize"
      @input="$emit('update:pageTo', $event)"
      :label="$t('pageTo')" />
  </div>
</template>

<script>
export default {
  props: ['pageFrom', 'pageTo'],
  computed: {
    pageInputSize() {
      if (window.innerWidth < 600) {
        return 'small-input'
      } else if (window.innerWidth > 601) {
        return 'regular-input'
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.regular-input
  width: 180px

.small-input
  width: 85px
</style>
