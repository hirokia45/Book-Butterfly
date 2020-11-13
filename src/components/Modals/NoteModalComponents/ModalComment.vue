<template>
  <div class="row q-mb-md">
    <q-input
      :value="comment"
      @input="$emit('update:comment', $event)"
      outlined
      clearable
      class="col"
      label="Comment"
      type="textarea"/>
  </div>
</template>

<script>
export default {
  props: ['comment']
}
</script>
