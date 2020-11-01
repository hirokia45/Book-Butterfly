<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height">
      <the-scroll-area>
        <div class="constrain-more">
          <q-card class="auth-tabs">
            <q-card-section class="row">
              <div class="text-h6 absolute-center q-pt-md">Login</div>
            </q-card-section>

            <form
              @submit.prevent="handleLogin"
              class="q-gutter-md"
            >
              <q-card-section>

                <div class="row q-mb-sm">
                  <q-input
                    outlined
                    clearable
                    v-model="user.email"
                    label="Your Email *"
                    lazy-rules
                    class="col"
                  />
                </div>

                <div class="row q-mb-sm">
                  <q-input
                    outlined
                    clearable
                    v-model="user.password"
                    label="Your Password *"
                    lazy-rules
                    class="col"
                  />
                </div>

                <q-card-actions align="center">
                  <q-btn label="Submit" type="submit" color="primary" />
                </q-card-actions>

              </q-card-section>

            </form>
          </q-card>
        </div>
      </the-scroll-area>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TheScrollArea from '../components/Layouts/TheScrollArea'
export default {
  name: 'PageLogin',
  components: {
    TheScrollArea
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
      //validation
      this.loading = true

      try {
        if (this.user.email && this.user.password) {
          await this.login(this.user)
        }
        const redirectUrl = '/' + (this.$route.query.redirect || 'home')
        await this.$router.replace(redirectUrl)

      } catch(err) {
        console.log(err)
      }

      this.loading = false
    }
  }
}
</script>
