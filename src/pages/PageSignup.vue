<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height">
<div class="constrain">

      <the-scroll-area>

          <q-card>
            <q-card-section class="row">
              <div class="text-h6 absolute-center q-pt-md">Signup</div>
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
import NameInput from '../components/Auth/NameInput'
import EmailInput from '../components/Auth/EmailInput'
import PasswordInput from '../components/Auth/PasswordInput'

export default {
  name: 'PageSignup',
  components: {
    TheScrollArea,
    NameInput,
    EmailInput,
    PasswordInput
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
