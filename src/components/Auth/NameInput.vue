<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      class="col"
      :value="name"
      :rules="[
        val => !!val || 'Field is required',
      ]"
      @input="$emit('update:name', $event)"
      ref="name"
      label="Username"
      lazy-rules
      autofocus
    />
  </div>
</template>

<script>
export default {
  props: ['name']
}
</script>
