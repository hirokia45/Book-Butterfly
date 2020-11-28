<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      clearable
      class="col"
      :value="title"
      @input="$emit('update:title', $event)"
      :rules="[val => !!val || 'Field is required!']"
      ref="title"
      :label="$t('bookTitle')" />
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>
