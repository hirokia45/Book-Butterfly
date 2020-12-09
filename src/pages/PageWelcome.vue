<template>
  <q-page class="bg">
    <div class="absolute fit">
      <div class="constrain fit" :class="flexSpace">
        <q-scroll-area :thumb-style="thumbStyle" class="fit bg-color rounded-borders">
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quisquam quam quibusdam repudiandae accusamus quos explicabo, vero voluptatem, commodi possimus porro provident rerum sequi voluptatum debitis, deleniti vel? Maxime, debitis!</div>
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quisquam quam quibusdam repudiandae accusamus quos explicabo, vero voluptatem, commodi possimus porro provident rerum sequi voluptatum debitis, deleniti vel? Maxime, debitis!</div>
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quisquam quam quibusdam repudiandae accusamus quos explicabo, vero voluptatem, commodi possimus porro provident rerum sequi voluptatum debitis, deleniti vel? Maxime, debitis!</div>
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quisquam quam quibusdam repudiandae accusamus quos explicabo, vero voluptatem, commodi possimus porro provident rerum sequi voluptatum debitis, deleniti vel? Maxime, debitis!</div>
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quisquam quam quibusdam repudiandae accusamus quos explicabo, vero voluptatem, commodi possimus porro provident rerum sequi voluptatum debitis, deleniti vel? Maxime, debitis!</div>
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quisquam quam quibusdam repudiandae accusamus quos explicabo, vero voluptatem, commodi possimus porro provident rerum sequi voluptatum debitis, deleniti vel? Maxime, debitis!</div>
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quisquam quam quibusdam repudiandae accusamus quos explicabo, vero voluptatem, commodi possimus porro provident rerum sequi voluptatum debitis, deleniti vel? Maxime, debitis!</div>
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quisquam quam quibusdam repudiandae accusamus quos explicabo, vero voluptatem, commodi possimus porro provident rerum sequi voluptatum debitis, deleniti vel? Maxime, debitis!</div>
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quisquam quam quibusdam repudiandae accusamus quos explicabo, vero voluptatem, commodi possimus porro provident rerum sequi voluptatum debitis, deleniti vel? Maxime, debitis!</div>
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quisquam quam quibusdam repudiandae accusamus quos explicabo, vero voluptatem, commodi possimus porro provident rerum sequi voluptatum debitis, deleniti vel? Maxime, debitis!</div>
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quisquam quam quibusdam repudiandae accusamus quos explicabo, vero voluptatem, commodi possimus porro provident rerum sequi voluptatum debitis, deleniti vel? Maxime, debitis!</div>
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quisquam quam quibusdam repudiandae accusamus quos explicabo, vero voluptatem, commodi possimus porro provident rerum sequi voluptatum debitis, deleniti vel? Maxime, debitis!</div>
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quisquam quam quibusdam repudiandae accusamus quos explicabo, vero voluptatem, commodi possimus porro provident rerum sequi voluptatum debitis, deleniti vel? Maxime, debitis!</div>
        </q-scroll-area>
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
  data() {
    return {
      flexSpace: '',
      thumbStyle: {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#333333',
        width: '5px',
        opacity: 0.4
      }
    }
  },
  created() {
    if (this.isLoggedIn) {
      this.$router.push('/home')
    }
  },
  mounted() {
    if(this.$q.platform.is.mobile){
      this.flexSpace='q-pa-sm'
    } else{
      this.flexSpace='q-pa-lg'
    }
  }
}
</script>

<style lang="sass" scoped>
body, html
  height: 100%

.bg
  background-image: url('https://book-buttefly-static-images.s3-ap-northeast-1.amazonaws.com/book-butterfly-welcome.jpg')
  height: 100%

  background-position: center
  background-repeat: no-repeat
  background-size: cover

.bg-color
  background-color: rgba(255, 255, 255, 0.8)
</style>
