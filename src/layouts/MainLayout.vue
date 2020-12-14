<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      elevated
      class="text-grey-10"
      v-if="isNotAuthPage && !isLoading"
    >
      <q-toolbar class="constrain" >
        <q-avatar
          v-if="isLoggedIn"
          class="small-screen-only"
          color="white"
        >
          <img :src="loggedInUser.avatar">
        </q-avatar>

        <q-toolbar-title
          class="text-gochi-hand text-bold">
          Book ButterFly
        </q-toolbar-title>
          <template v-if="isLoggedIn">
            <q-btn
              to="/home"
              class="large-screen-only"
              icon="eva-home-outline"
              size="18px"
              flat
              round
            />
            <q-btn
              to="/library"
              class="large-screen-only"
              icon="eva-book-open-outline"
              size="18px"
              flat
              round
            />
            <q-btn
              to="/notifications"
              icon="eva-email-outline"
              class="large-screen-only"
              size="18px"
              flat
              round
            >
              <q-badge
                v-if="totalNotificationsUnconfirmed > 0"
                color="red"
                floating
                style="right: 5px; top: 7px;"
              >
                {{totalNotificationsUnconfirmed}}
              </q-badge>
            </q-btn>

            <q-fab
              v-model="fab"
              vertical-actions-align="right"
              color="grey-10"
              flat
              class="settings-mobile"
              size="18px"
              icon="eva-settings-2-outline"
              direction="down"
            >
              <q-fab-action
                color="secondary"
                icon="eva-person"
                label-position="left"
                :label="$t('profile')"
                square
                to="/profile"
              />
              <q-fab-action
                color="primary"
                icon="eva-settings-outline"
                label-position="left"
                :label="$t('settings')"
                square
                to="/settings"
              />
              <q-fab-action
                @click="logOut"
                color="deep-orange-3"
                icon="eva-log-out"
                label-position="left"
                :label="$t('logout')"
                square
              />
            </q-fab>

            <q-avatar class="large-screen-only q-ml-sm" color="white">
              <img :src="loggedInUser.avatar">
            </q-avatar>
          </template>

          <template v-else>
            <q-btn
              to="/auth/login"
              class="large-screen-only"
              style="color: primary"
              :label="$t('login')"
              size="18px"
              flat
            />
            <q-btn
              to="/auth/signup"
              class="large-screen-only"
              :label="$t('signup')"
              size="18px"
              flat
            />
            <div class="small-screen-only">
              <q-fab
                v-model="fab"
                class="absolute-right"
                vertical-actions-align="right"
                color="grey-10"
                flat
                size="18px"
                icon="eva-settings-2-outline"
                direction="down"
              >
                <q-fab-action
                  color="secondary"
                  icon="eva-person"
                  label-position="left"
                  :label="$t('login')"
                  square
                  to="/auth/login"
                />
                <q-fab-action
                  color="primary"
                  icon="eva-person-add"
                  label-position="left"
                  :label="$t('signup')"
                  square
                  to="/auth/signup"
                />
              </q-fab>
            </div>
          </template>
      </q-toolbar>
    </q-header>

    <q-footer
    v-if="isLoggedIn && !isLoading"
      class="bg-white"
      bordered
    >
      <q-tabs
        class="text-grey-8  small-screen-only"
        active-color="secondary"
        indicator-color="transparent"
      >
        <q-route-tab
          to="/library"
          icon="eva-book-open-outline"
        />
        <q-route-tab
          to="/home"
          icon="eva-home-outline"
        />
        <!-- <q-route-tab
          to="/library"
          icon="eva-clock-outline"
        /> -->
        <q-route-tab
          to="/notifications"
          icon="eva-email-outline"
        >
          <q-badge
            v-if="totalNotificationsUnconfirmed > 0"
            color="red"
            floating
          >
            {{totalNotificationsUnconfirmed}}
          </q-badge>
        </q-route-tab>
      </q-tabs>
    </q-footer>

    <q-page-container class="bg-brown-1">
      <keep-alive :include="['PageHome']">
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      fab: false,
    }
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn', 'loggedInUser']),
    ...mapGetters('notifications', ['totalNotificationsUnconfirmed']),
    isNotAuthPage() {
      return this.$route.path !== '/auth/login' && this.$route.path !== '/auth/signup'
    },
    isLoading() {
      return this.$route.path === '/welcome' && this.isLoggedIn
    }
  },
  watch: {
    watchLoggedInStat(curValue, oldValue) {
      if (!this.isLoggedIn) {
        this.$router.replace('/auth/login')
      }
    },
    totalNotificationsUnconfirmed(newCount, oldCount) {
    }
  },
  created() {
    this.checkSystemAvailabilities()
  },
  mounted() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
    })
  },
  methods: {
    ...mapActions('auth', ['logout']),
    ...mapActions('system', ['checkSystemAvailabilities']),
    async logOut() {
      try {
        await this.logout()
        if (this.$route.path !== '/auth/login' && this.$route.path !== '/auth/signup' && this.$route.path !== '/welcome') {

        this.$router.push('/welcome')
        }
      } catch (err) {
        console.error(err)
      }
    },
  }
}
</script>

<style lang="sass" scoped>
.q-toolbar
  position: relative
  @media (min-width: $breakpoint-sm-min)
    height: 72px

.q-toolbar__title
  font-size: 30px

  @media (max-width: $breakpoint-xs-max)
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)

.settings-mobile
  @media (max-width: $breakpoint-xs-max)
    position: absolute
    right: 0%

.q-footer
  .q-tab__icon
    font-size: 36px
</style>
