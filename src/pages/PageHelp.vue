<template>
  <q-page>
    <div class="absolute fit">
    	<div class="constrain-more q-pa-lg fit sticky-page-container">
        <base-scroll-area>
          <div class="text-h5">Help</div>
        </base-scroll-area>

    	  <div class="fab-sticky-button">
    	    <q-btn
    	      @click="$router.go(-1)"
    	      fab
    	      class="grey-gradient-background shadow-5 text-grey-8"
    	      icon="eva-arrow-back"
    	    />
    	  </div>
    	</div>
    </div>
  </q-page>
</template>

<script>
export default {
  components: {
    BaseScrollArea: () => import('../components/Layouts/BaseScrollArea')
  }
}
</script>
