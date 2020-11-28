<template>
  <q-page class="bg column justify-center">
    <div class="full-width full-height">
      <div class="constrain">
        <div
          :class="!isDeskTop ? 'justify-center' : 'justify-end'"
          class=" row"
        >
          <div class="desktop-settings">
            <q-card class="q-pa-md login-card">
              <q-card-section class="q-pa-md text-center">
                <div class="text-h5 text-weight-bold">BOOK BUTTERFLY {{ $t('login') }}</div>
              </q-card-section>

              <form
                @submit.prevent="handleLogin"
              >
                <q-card-section>

                  <email-input
                    :email.sync="user.email"
                    ref="inputEmail"
                  />

                  <password-input
                    :password.sync="user.password"
                    ref="inputPassword"
                  />

                  <q-card-actions align="center">
                    <q-btn :label="$t('submitLogin')" type="submit" color="primary" />
                  </q-card-actions>

                </q-card-section>
              </form>

              <q-card-section
                @click="toSignupPage"
                class="q-pa-md text-center"
                style="cursor: pointer;"
              >
                <div class="text-body2 text-weight-bold">{{ $t('loginMessage') }}</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PageLogin',
  components: {
    EmailInput: () => import('../components/Auth/EmailInput'),
    PasswordInput: () => import('../components/Auth/PasswordInput')
  },
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      loading: false
    }
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn']),
    isDeskTop() {
      return (window.innerWidth > 600 ? true : false)
    }
  },
  created() {
    if (this.isLoggedIn) {
      this.$router.push('/home')
    }
  },
  methods: {
    ...mapActions('auth', ['login']),

    toSignupPage() {
      this.$router.push(
        { path: '/auth/signup'}
      )
    },

    async handleLogin() {
      this.$refs.inputEmail.$refs.email.validate()
      this.$refs.inputPassword.$refs.password.validate()

      if (!this.$refs.inputEmail.$refs.email.hasError &&
          !this.$refs.inputPassword.$refs.password.hasError) {
        this.loading = true

        try {
          await this.login(this.user)
          const redirectUrl = '/' + (this.$route.query.redirect || 'home')
          await this.$router.replace(redirectUrl)

        } catch(err) {
          console.log(err)
        }

        this.loading = false
      } else {
          this.$q.notify({
          message: 'You have unvalidated fields',
          color: 'red',
          position: 'top'
        })
      }
    }
  }
}
</script>

<style lang="sass" scoped>
body, html
  height: 100%

.bg
  background-image: url('https://book-buttefly-static-images.s3-ap-northeast-1.amazonaws.com/book-butterfly-login.jpg')
  height: 100%

  background-position: center
  background-repeat: no-repeat
  background-size: cover

.desktop-settings
  @media (min-width: $breakpoint-sm-min)
    margin-right: 25px

.login-card
  width: 280px
  margin: 0 auto
  border-radius: 15px
</style>
