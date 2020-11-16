<template>
  <q-page class="bg">
    <div class="q-pa-md constrain">
      <div class="text-white text-h2 text-weight-bold text-center">
        WELCOME
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PageWelcome',
  computed: {
    ...mapGetters('auth', ['isLoggedIn'])
  },
  created() {
    if (this.isLoggedIn) {
      this.$router.push('/home')
    }
  },
}
</script>


<style lang="sass" scoped>
body, html
  height: 100%

.bg
  background-image: url('https://book-buttefly-static-images.s3-ap-northeast-1.amazonaws.com/temp-welcome-background-image.jpg')
  height: 100%

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

</style>
