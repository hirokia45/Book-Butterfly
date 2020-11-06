<template>
  <q-page class="bg">

    <div class="q-pa-md absolute full-width full-height">
      <the-scroll-area>
      <div class="constrain">

        <div class="row q-col-gutter-lg">
          <div class="col-12 col-sm-8">
            <div class="text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae aperiam iusto error ipsa eius illo similique, dignissimos deserunt, fuga, quibusdam ut dicta nam repudiandae aut. Accusantium, mollitia consequatur? Saepe, velit?
            </div>
          </div>

          <div class="col-12 col-sm-4">

              <q-card class="q-pa-md">
                <q-card-section class="q-pa-md">
                  <div class="text-h5 text-weight-bold">Create an account!</div>
                  <div class="text-subtitle1 text-weight-light">Please fill in the information</div>
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
                        label="Register"
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
      </the-scroll-area>
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
    backgroundImage() {
      return {
        backgroundImage: `url${require('../assets/temp-register-background-image.jpg')}`
      }
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
  background-image: url('../assets/temp-register-background-image.jpg')
  height: 100%

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

</style>
