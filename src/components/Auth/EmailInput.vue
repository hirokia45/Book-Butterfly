<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      :value="email"
      :rules="[
        val => !!val || $t('fieldRequired'),
        val => isValidEmailAddress(val) || $t('emailValidation')
      ]"
      @input="$emit('update:email', $event)"
      ref="email"
      :label="$t('email')"
      lazy-rules
      class="col"
    />
  </div>
</template>

<script>
export default {
  props: ['email'],
  methods: {
    isValidEmailAddress(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
  }
}
</script>
