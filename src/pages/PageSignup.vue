<template>
  <q-page class="bg fit column justify-center">
    <div class="q-pa-lg">
      <div class="constrain">
        <div class="row">
          <div class="col-12 col-sm-8">
            <div class="text-white text-h4 q-pt-xl signup-copy q-mb-sm">
              {{ $t('signupCopy1') }}
            </div>
            <div class="text-white text-h6 text-weight-light">
              {{ $t('signupCopy2') }}
            </div>
          </div>

          <div class="col-12 col-sm-4"
            :class="{'q-pl-xl': isDeskTop}"
            >
            <div class="row justify-center q-my-md">
              <q-btn
                to="/auth/login"
                class="purple-gradient-background"
                :label="$t('login')"
                text-color="white"
              />
            </div>

            <q-card class="q-px-md q-py-sm">
              <q-card-section class="q-pa-md">
                <div class="text-h5 text-weight-bold">{{ $t('signupMessage') }}</div>
                <div class="text-subtitle1 text-weight-light">{{ $t('signupMessageFill') }}</div>
              </q-card-section>

              <form
                @submit.prevent="handleSingup"
              >
                <q-card-section>
                  <name-input
                    :name.sync="user.name"
                    ref="inputName"
                  />

                  <email-input
                    :email.sync="user.email"
                    ref="inputEmail"
                  />

                  <password-input
                    :password.sync="user.password"
                    ref="inputPassword"
                  />

                  <q-card-actions align="center">
                    <q-btn
                      outline
                      icon="eva-email-outline"
                      color="primary"
                      :label="$t('register')"
                      type="submit"
                      class="q-py-xs q-px-sm"
                    />
                  </q-card-actions>
                </q-card-section>
              </form>
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
  name: 'PageSignup',
  components: {
    NameInput: () => import('../components/Auth/NameInput'),
    EmailInput: () => import('../components/Auth/EmailInput'),
    PasswordInput: () => import('../components/Auth/PasswordInput')
  },
  data() {
    return {
      user: {
        name: '',
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
  mounted() {
    if (this.isLoggedIn) {
      this.$router.push('/home')
    }
  },
  methods: {
    ...mapActions('auth', ['signup']),

    async handleSingup() {
      this.$refs.inputName.$refs.name.validate()
      this.$refs.inputEmail.$refs.email.validate()
      this.$refs.inputPassword.$refs.password.validate()

      if (!this.$refs.inputName.$refs.name.hasError &&
          !this.$refs.inputEmail.$refs.email.hasError &&
          !this.$refs.inputPassword.$refs.password.hasError) {
        this.loading = true

        try {
          await this.signup(this.user)

          const redirectUrl = '/' + (this.$route.query.redirect || 'home')
          await this.$router.replace(redirectUrl)
        } catch (err) {
          console.error(err)
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
  background-image: url('https://book-buttefly-static-images.s3-ap-northeast-1.amazonaws.com/book-butterfly-signup.jpg')
  height: 100%

  background-position: center
  background-repeat: no-repeat
  background-size: cover

.signup-copy
  letter-spacing: 1px
</style>
