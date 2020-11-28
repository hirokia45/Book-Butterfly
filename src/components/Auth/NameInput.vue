<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      class="col"
      :value="name"
      :rules="[
        val => !!val || $t('fieldRequired'),
      ]"
      @input="$emit('update:name', $event)"
      ref="name"
      :label="$t('username')"
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
