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
export default {
  name: 'PageWelcome'
}
</script>


<style lang="sass" scoped>
body, html
  height: 100%

.bg
  background-image: url('../assets/temp-welcome-background-image.jpg')
  height: 100%

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

</style>
