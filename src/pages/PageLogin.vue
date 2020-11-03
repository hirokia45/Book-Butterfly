<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height">
<div class="constrain">

      <the-scroll-area>

          <q-card>
            <q-card-section class="row">
              <div class="text-h6 absolute-center q-pt-md">Login</div>
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
          </q-card>

      </the-scroll-area>

</div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TheScrollArea from '../components/Layouts/TheScrollArea'
import EmailInput from '../components/Auth/EmailInput'
import PasswordInput from '../components/Auth/PasswordInput'

export default {
  name: 'PageLogin',
  components: {
    TheScrollArea,
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
