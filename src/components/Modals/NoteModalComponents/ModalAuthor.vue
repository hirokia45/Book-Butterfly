<template>
  <div class="row q-mb-md">
    <q-input
      outlined
      clearable
      class="col"
      :value="author"
      @input="$emit('update: author', $event)"
      :label="$t('author')" />
  </div>
</template>

<script>
export default {
  props: ['author']
}
</script>
