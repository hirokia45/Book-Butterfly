<template>
  <q-page class="bg">
    <div class="absolute fit">
      <div class="constrain fit" :class="flexSpace">
        <q-scroll-area :thumb-style="thumbStyle" content-style="height: 100%" class="fit bg-color text-grey-8 rounded-borders main-frame" id="scrollArea">
          <div class="column justify-center" :class="{'full-height': isFullHeight}">
            <div class="text-h3 text-center text-bold q-pa-md">WELCOME TO BOOK BUTTERFLY</div>
            <div class="row justify-center q-mt-md">
              <div class="text-h6 text-center col-10 col-sm-8">Book Butterfly is a reading log app for all book lovers and those who want to be productive readers. You'll remember what you read more by outputting your thoughts.</div>
            </div>
            <div class="row justify-center text-grey-10 q-ma-xl">
              <q-btn
                to="/auth/signup"
                class="primary-gradient-background q-px-md"
                label="Get Started Now !!"
                size="lg"
                rounded
              />
            </div>
            <div class="text-h6 text-bold text-center">
              Scroll down to know more about Book Butterfly!
            </div>
            <div class="text-center">
              <q-icon name="eva-arrow-downward" class="text-grey-10 q-ma-sm" style="font-size: 3rem;" />
            </div>
          </div>

          <div class="bg-color2">
            <div class="text-white text-h4 text-center text-bold q-px-md q-py-xl">What You Can Do with This App</div>

            <div class="row justify-center q-pb-xl">
              <div class="col-11 col-sm-4">
                <card-welcome-item >
                  <template v-slot:icon>
                    <q-img
                      src="https://book-buttefly-static-images.s3-ap-northeast-1.amazonaws.com/reading.png"
                      class="card-image"
                    />
                  </template>

                  <template v-slot:title>
                    <div>Reading</div>
                  </template>

                  <template v-slot:content>
                    <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam ab omnis ex temporibus rem velit nostrum? A quod dignissimos qui deleniti, minus magnam voluptatibus. Accusamus, veritatis. Maxime molestias dignissimos necessitatibus.</div>
                  </template>
                </card-welcome-item>
              </div>

              <div class="col-11 col-sm-4">
                <card-welcome-item >
                  <template v-slot:icon>
                    <q-img
                      src="https://book-buttefly-static-images.s3-ap-northeast-1.amazonaws.com/writing.png"
                      class="card-image"
                    />
                  </template>

                  <template v-slot:title>
                    <div>Writing</div>
                  </template>

                  <template v-slot:content>
                    <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam ab omnis ex temporibus rem velit nostrum? A quod dignissimos qui deleniti, minus magnam voluptatibus. Accusamus, veritatis. Maxime molestias dignissimos necessitatibus.</div>
                  </template>
                </card-welcome-item>
              </div>

              <div class="col-11 col-sm-4">
                <card-welcome-item >
                  <template v-slot:icon>
                    <q-img
                      src="https://book-buttefly-static-images.s3-ap-northeast-1.amazonaws.com/camera.png"
                      class="card-image"
                    />
                  </template>

                  <template v-slot:title>
                    <div>Camera</div>
                  </template>

                  <template v-slot:content>
                    <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam ab omnis ex temporibus rem velit nostrum? A quod dignissimos qui deleniti, minus magnam voluptatibus. Accusamus, veritatis. Maxime molestias dignissimos necessitatibus.</div>
                  </template>
                </card-welcome-item>
              </div>

            </div>
          </div>

          <div class="bg-color3 q-pb-md">
            <div class="text-grey-8 text-h4 text-center text-bold q-px-md q-pt-xl q-pb-lg">Amazing PWA Features!!</div>
            <div class="q-mb-lg">
              <q-img src="https://book-buttefly-static-images.s3-ap-northeast-1.amazonaws.com/bookbutterfly_cross_platform.jpg"></q-img>
            </div>

            <div class="row justify-center">
              <welcome-icon
                v-for="pwaItem in pwaItems"
                :key="pwaItem.id"
                :icon="pwaItem.icon"
                :bgColor="pwaItem.bgColor"
                :title="pwaItem.title"
              />
            </div>
          </div>

          <div class="bg-color2">
            <div class="text-white text-h4 text-center text-bold q-px-md q-pt-xl q-pb-md">Why You Should Use This App?</div>

            <div class="row q-pa-md">
              <div class="row justify-start q-mb-md">
                <q-card class="col-sm-8 bg-color" flat bordered>
                  <q-card-section horizontal>
                    <q-img
                      contain
                      class="col-3 bg-white"
                      src="https://book-buttefly-static-images.s3-ap-northeast-1.amazonaws.com/person_question.png"
                    />
                    <q-card-section>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi quae tenetur suscipit rerum inventore commodi officiis veritatis tempore repudiandae quos? Aperiam enim earum, eligendi praesentium dolor impedit qui minima dignissimos.
                    </q-card-section>
                  </q-card-section>
                </q-card>
              </div>

              <div class="row justify-end q-mb-md">
                <q-card class="col-sm-8 bg-color" flat bordered>
                  <q-card-section horizontal>
                    <q-card-section>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi quae tenetur suscipit rerum inventore commodi officiis veritatis tempore repudiandae quos? Aperiam enim earum, eligendi praesentium dolor impedit qui minima dignissimos.
                    </q-card-section>
                    <q-img
                      contain
                      class="col-3 bg-white"
                      src="https://book-buttefly-static-images.s3-ap-northeast-1.amazonaws.com/person_bulb.png"
                    />
                  </q-card-section>
                </q-card>
              </div>

              <div class="row justify-start q-mb-md">
                <q-card class="col-sm-8 bg-color" flat bordered>
                  <q-card-section horizontal>
                    <q-img
                      contain
                      class="col-3 bg-white"
                      src="https://book-buttefly-static-images.s3-ap-northeast-1.amazonaws.com/person_target.png"
                    />
                    <q-card-section>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi quae tenetur suscipit rerum inventore commodi officiis veritatis tempore repudiandae quos? Aperiam enim earum, eligendi praesentium dolor impedit qui minima dignissimos.
                    </q-card-section>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>

          <div class="bg-color3 q-pa-xl">
            <div class="text-grey-8 text-h4 text-center text-bold">Now let's start your journey!!</div>
            <div class="row justify-center text-grey-10 q-ma-xl">
              <q-btn
                to="/auth/signup"
                class="primary-gradient-background q-px-md text-white"
                label="Get Started Now !!"
                size="lg"
                rounded
              />
            </div>
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
  components: {
    CardWelcomeItem: () => import('../components/Layouts/ui/CardWelcomeItem'),
    WelcomeIcon: () => import('../components/Layouts/ui/WelcomeIcon'),
    FadeIn: () => import('../components/Layouts/ui/FadeIn')
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn']),
    isFullHeight() {
      return window.innerWidth > 400 ? true : false
    }
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
      },
      pwaItems: [
        {
          id: 1,
          icon: 'home',
          bgColor: 'orange-gradient',
          title: this.$t('homescreen'),
          content: this.$t('homescreenContent')
        },
        {
          id: 2,
          icon: 'wifi_off',
          bgColor: 'green-gradient',
          title: this.$t('offline'),
          content: this.$t('offlineContent')
        },
        {
          id: 3,
          icon: 'notifications',
          bgColor: 'blue-gradient',
          title: this.$t('notificationWelcome'),
          content: this.$t('notificationContent')
        },
        {
          id: 4,
          icon: 'phonelink',
          bgColor: 'purple-gradient',
          title: this.$t('responsive'),
          content: this.$t('responsiveContent')
        },
      ]
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

.bg-color2
  background-color: rgba(239, 129, 15, 0.6)

.bg-color3
  background-color: rgba(255, 255, 255, 0.5)

.card-image
  width: 100px
</style>
