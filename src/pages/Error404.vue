<template>
  <div class="fullscreen bg-brown-1 text-grey-10 text-center q-pa-md flex flex-center">
    <base-scroll-area>
      <div>
        <div style="font-size: 30vh">
          <q-icon name="sentiment_very_dissatisfied"></q-icon>
          404
        </div>

        <div class="text-h2" style="opacity:.4">
          {{$t('noPageMessage')}}
        </div>

        <q-btn
          class="q-mt-xl grey-gradient-background"
          text-color="grey-10"
          unelevated
          to="/"
          :label="$t('goHome')"
          no-caps
        />
      </div>
    </base-scroll-area>
  </div>
</template>

<script>
export default {
  name: 'Error404',
  components: {
    BaseScrollArea: () => import('../components/Layouts/BaseScrollArea')
  }
}
</script>
