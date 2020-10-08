<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-footer elevated>
      <q-tabs>
        <q-tab name="mails" icon="mail" />
        <q-tab name="alarms" icon="alarm" />
        <q-tab name="movies" icon="movie" />
      </q-tabs>
    </q-footer>

    <q-page-container>
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
