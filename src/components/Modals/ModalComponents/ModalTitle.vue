<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      clearable
      class="col"
      :value="title"
      @input="$emit('update:title', $event)"
      :rules="[val => !!val || 'Field is required!']"
      autofocus
      ref="title"
      label="Book Title" />
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>
