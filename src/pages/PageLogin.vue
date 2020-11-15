<template>
  <q-page class="bg">
    <div class="full-width full-height">
      <q-card class="q-pa-lg login-card absolute-center">
        <q-card-section class="q-pa-md text-center">
          <div class="text-h5 text-weight-bold">BOOK BUTTERFLY LOGIN</div>
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
              <q-btn label="Submit" type="submit" color="primary" />
            </q-card-actions>

          </q-card-section>
        </form>

        <q-card-section
          @click="toSignupPage"
          class="q-pa-md text-center"
          style="cursor: pointer;"
        >
          <div class="text-body2 text-weight-bold">No account? Sign up!</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import EmailInput from '../components/Auth/EmailInput'
import PasswordInput from '../components/Auth/PasswordInput'

export default {
  name: 'PageLogin',
  components: {
    EmailInput,
    PasswordInput
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
  background-image: url('https://book-buttefly-static-images.s3-ap-northeast-1.amazonaws.com/temp-login-background-image.jpg')
  height: 100%

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;


.login-card
  width: 340px
  margin: 0 auto
  border-radius: 15px
</style>
