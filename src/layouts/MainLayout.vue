<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      elevated
      class="text-grey-10"
    >
      <q-toolbar class="constrain">

        <q-avatar class="small-screen-only">
          <img src="https://cdn.quasar.dev/img/avatar.png">
        </q-avatar>

        <q-toolbar-title
          class="text-gochi-hand text-bold">
          Book ButterFly
        </q-toolbar-title>
          <q-btn
            to="/"
            class="large-screen-only"
            icon="eva-home-outline"
            size="18px"
            flat
            round
          />
          <q-btn
            to="/library"
            class="large-screen-only"
            icon="eva-book-open-outline"
            size="18px"
            flat
            round
          />
          <q-btn
            to="/notifications"
            icon="eva-email-outline"
            class="large-screen-only"
            size="18px"
            flat
            round
          />
          <q-btn
            icon="eva-settings-2-outline"
            class="settings-mobile"
            size="18px"
            flat
            round
          />
          <q-avatar class="large-screen-only q-ml-sm">
            <img src="https://cdn.quasar.dev/img/avatar.png">
          </q-avatar>
      </q-toolbar>
    </q-header>

    <q-footer
      class="bg-white small-screen-only"
      bordered
    >
      <q-tabs
        class="text-grey-8"
        active-color="secondary"
        indicator-color="transparent"

      >
        <q-route-tab
          to="/library"
          icon="eva-book-open-outline"
        />
        <q-route-tab
          to="/"
          icon="eva-home-outline"
        />
        <q-route-tab
          to="/notifications"
          icon="eva-email-outline"
        />
      </q-tabs>
    </q-footer>

    <q-page-container class="bg-brown-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {

    }
  }
}
</script>

<style lang="sass">
.q-toolbar
  position: relative
  @media (min-width: $breakpoint-sm-min)
    height: 72px

.q-toolbar__title
  font-size: 30px

  @media (max-width: $breakpoint-xs-max)
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)

.settings-mobile
  @media (max-width: $breakpoint-xs-max)
    position: absolute
    right: 0%

.q-footer
  .q-tab__icon
    font-size: 36px
</style>
