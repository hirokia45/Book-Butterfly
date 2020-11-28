<template>
  <div class="row q-mb-md">
    <q-input
      outlined
      clearable
      class="col"
      :value="chapter"
      @input="$emit('update:chapter', $event)"
      :label="$t('chapterOrSection')" />
  </div>
</template>

<script>
export default {
  props: ['chapter']
}
</script>
