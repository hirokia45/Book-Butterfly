<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      type="password"
      :value="password"
      :rules="[
        val => !!val || 'Field is required',
        val => val.length >= 6 || 'Please enter at least 6 characters',
        val => val !== 'password' || 'Password cannot be password',
      ]"
      @input="$emit('update:password', $event)"
      ref="password"
      label="Password"
      lazy-rules
      class="col"
    />
  </div>
</template>

<script>
export default {
  props: ['password']
}
</script>
