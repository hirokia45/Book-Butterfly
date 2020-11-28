<template>
  <div class="row q-mb-md">
    <q-input
      outlined
      clearable
      class="col"
      :value="category"
      @input="$emit('update:category', $event)"
      :label="$t('category')" />
  </div>
</template>

<script>
export default {
  props: ['category']
}
</script>
