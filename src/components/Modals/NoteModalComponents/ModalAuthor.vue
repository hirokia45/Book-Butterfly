<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      clearable
      class="col"
      :value="author"
      @input="$emit('update: author', $event)"
      label="Author" />
  </div>
</template>

<script>
export default {
  props: ['author']
}
</script>
