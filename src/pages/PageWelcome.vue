<template>
  <q-page class="bg">
    <div v-if="!isLoggedIn" class="absolute fit">
      <div class="constrain fit" :class="flexSpace">
        <q-scroll-area :thumb-style="thumbStyle" content-style="height: 100%" class="fit bg-color text-grey-8 rounded-borders main-frame" id="scrollArea">
          <div class="column justify-center" :class="{'full-height': isFullHeight}">
            <div class="text-h3 text-center text-bold q-pa-md">{{ $t('welcomeTitle') }}</div>
            <div class="text-h6 text-center text-bold">採用担当者様はお手数ですがログイン画面のテストアカウントよりログインお願い致します。</div>
            <div class="row justify-center q-mt-md">
              <div class="text-h6 text-center col-10 col-sm-8">{{ $t('welcomePara') }}</div>
            </div>
            <div class="row justify-center text-grey-10 q-ma-xl">
              <q-btn
                to="/auth/signup"
                class="primary-gradient-background q-px-md"
                :label="$t('welcomeButton')"
                size="lg"
                rounded
              />
            </div>
            <div class="text-h6 text-bold text-center">
              {{ $t('welcomeScroll') }}
            </div>
            <div class="text-center">
              <q-icon name="eva-arrow-downward" class="text-grey-10 q-ma-sm" style="font-size: 3rem;" />
            </div>
          </div>

          <div class="bg-color2">
            <div class="text-white text-h4 text-center text-bold q-px-md q-py-xl">{{ $t('panelTitle2') }}</div>

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
                    <div>{{ $t('featureTitle1') }}</div>
                  </template>

                  <template v-slot:content>
                    <div>{{ $t('featureContent1') }}</div>
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
                    <div>{{ $t('featureTitle2') }}</div>
                  </template>

                  <template v-slot:content>
                    <div>{{ $t('featureContent2') }}</div>
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
                    <div>{{ $t('featureTitle3') }}</div>
                  </template>

                  <template v-slot:content>
                    <div>{{ $t('featureContent3') }}</div>
                  </template>
                </card-welcome-item>
              </div>

            </div>
          </div>

          <div class="bg-color3 q-pb-md">
            <div class="text-grey-8 text-h4 text-center text-bold q-px-md q-pt-xl q-pb-lg">{{ $t('panelTitle3') }}</div>
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
                :content="pwaItem.content"
              />
            </div>
          </div>

          <div class="bg-color2">
            <div class="text-white text-h4 text-center text-bold q-px-md q-pt-xl q-pb-md">{{ $t('panelTitle4') }}</div>

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
                      <div class="text-body1 text-bold">{{$t('point1Title1')}}</div>
                      <div class="text-body2 q-mt-xs">{{$t('point1Body1')}}</div>

                      <div class="text-body1 text-bold q-mt-md">{{$t('point1Title2')}}</div>
                      <div class="text-body2 q-mt-xs">{{$t('point1Body2')}}</div>

                      <div class="text-body1 text-bold q-mt-md">{{$t('point1Title3')}}</div>
                      <div class="text-body2 q-mt-xs">{{$t('point1Body3')}}</div>
                    </q-card-section>
                  </q-card-section>
                </q-card>
              </div>

              <div class="row justify-end q-mb-md">
                <q-card class="col-sm-8 bg-color" flat bordered>
                  <q-card-section horizontal>
                    <q-card-section>
                      <div class="text-body1 text-bold">{{$t('point2Title1')}}</div>
                      <div class="text-body2 q-mt-xs">{{$t('point2Body1')}}</div>

                      <div class="text-body1 text-bold q-mt-md">{{$t('point2Title2')}}</div>
                      <div class="text-body2 q-mt-xs">{{$t('point2Body2')}}</div>

                      <div class="text-body1 text-bold q-mt-md">{{$t('point2Title3')}}</div>
                      <div class="text-body2 q-mt-xs">{{$t('point2Body3')}}</div>
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
                      <div class="text-body1 text-bold">{{$t('point3Title1')}}</div>
                      <div class="text-body2 q-mt-xs">{{$t('point3Body1')}}</div>

                      <div class="text-body1 text-bold q-mt-md">{{$t('point3Title2')}}</div>
                      <div class="text-body2 q-mt-xs">{{$t('point3Body2')}}</div>

                      <div class="text-body1 text-bold q-mt-md">{{$t('point3Title3')}}</div>
                      <div class="text-body2 q-mt-xs">{{$t('point3Body3')}}</div>

                    </q-card-section>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>

          <div class="bg-color3 q-pa-xl">
            <div class="text-grey-8 text-h4 text-center text-bold">{{ $t('panelTitle5') }}</div>
            <div class="row justify-center text-grey-10 q-ma-xl">
              <q-btn
                to="/auth/signup"
                class="primary-gradient-background q-px-md text-white"
                :label="$t('welcomeButton')"
                size="lg"
                rounded
              />
            </div>
          </div>
        </q-scroll-area>
      </div>
    </div>
    <div v-else class="loadingScreen">
      <div class="absolute-center">
        <q-img src="icons/icon-192x192.png" class="q-pb-none" style="height: 150px; width: 150px;"></q-img>
        <div class="text-gochi-hand text-h5 text-center">Loading...</div>
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
    //FadeIn: () => import('../components/Layouts/ui/FadeIn')
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
      setTimeout(() => {
        this.$router.push('/home')
      }, 1500);
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

.loadingScreen
  height: 100vh
  width: 100vw
  background-color: #FFFFFF
  z-index: 4
</style>
