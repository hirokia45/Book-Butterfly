<template>
  <q-page class="bg">
    <div class="absolute fit">
      <div class="constrain fit" :class="flexSpace">
        <q-scroll-area :thumb-style="thumbStyle" class="fit bg-color text-grey-8 rounded-borders">
          <div>
            <div class="text-h3 text-center text-bold q-mt-xl q-pa-md">WELCOME TO BOOK BUTTERFLY</div>
            <div class="row justify-center q-mt-sm">
              <div class="text-h6 text-center col-10 col-sm-8">Book Butterfly is a reading log app for all book lovers and those who want to be productive readers. You'll remember what you read more by outputting your thoughts.</div>
            </div>
            <div class="row justify-center text-grey-10 q-ma-lg">
              <q-btn
                to="/auth/signup"
                class="primary-gradient-background q-px-md"
                label="Get Started For Free"
                size="lg"
                rounded
                unelevated
              />
            </div>

            <!-- <div class="row justify-center q-gutter-sm">
              <q-card dark bordered class="bg-grey-9 col-11 col-sm-4">
                <q-card-section>
                  <div class="text-h6">Our Changing Planet</div>
                  <div class="text-subtitle2">by John Doe</div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section>
                  {{ lorem }}
                </q-card-section>
              </q-card>
              <q-card dark bordered class="bg-grey-9 col-11 col-sm-4">
                <q-card-section>
                  <div class="text-h6">Our Changing Planet</div>
                  <div class="text-subtitle2">by John Doe</div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section>
                  {{ lorem }}
                </q-card-section>
              </q-card>
              <q-card dark bordered class="bg-grey-9 col-11 col-sm-4">
                <q-card-section>
                  <div class="text-h6">Our Changing Planet</div>
                  <div class="text-subtitle2">by John Doe</div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section>
                  {{ lorem }}
                </q-card-section>
              </q-card>
            </div> -->
          </div>

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
  background-color: rgba(255, 255, 255, 0.9)

</style>
