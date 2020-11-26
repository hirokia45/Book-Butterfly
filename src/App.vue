<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters('system', ['lang'])
  },
  watch: {
    lang(lang) {
      this.$i18n.locale = lang
    }
  },
}
</script>
