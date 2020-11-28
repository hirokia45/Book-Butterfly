<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      type="password"
      :value="password"
      :rules="[
        val => !!val || $t('fieldRequired'),
        val => val.length >= 6 || $t('passwordValidationLength'),
        val => val !== 'password' || $t('passwordValidationPassword'),
      ]"
      @input="$emit('update:password', $event)"
      ref="password"
      :label="$t('password')"
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
