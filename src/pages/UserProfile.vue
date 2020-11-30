<template>
  <q-page>
    <div class="absolute fit">
      <base-scroll-area>
        <div class="constrain-some row justify-between q-pa-md">
          <div class="column col-grow">
            <user-info-card
              class="col-12"
              :loggedInUser="loggedInUser"
            />
          </div>

          <div class="col-grow" :class="{ 'q-ml-lg' : !isMobileScreen, 'q-mt-lg' : isMobileScreen}">
            <div class="col-12 col-6-sm" v-if="!$q.platform.is.ie">
              <q-card>
                <note-calendar class="shadow-2 calendar-position"></note-calendar>
              </q-card>
            </div>

            <div class="side-card q-mt-lg settings-mobile col-12 col-6-sm">
              <user-achievement />
            </div>
          </div>

        </div>
      </base-scroll-area>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'UserProfile',
  components: {
    UserInfoCard: () => import('../components/User/UserInfoCard'),
    NoteCalendar: () => import('../components/Notes/NoteCalendar'),
    UserAchievement: () => import('../components/User/UserAchievement'),
    BaseScrollArea: () => import('../components/Layouts/BaseScrollArea')
  },
  computed: {
    ...mapGetters('auth', ['loggedInUser', 'isLoggedIn']),
    isMobileScreen() {
      return (window.innerWidth > 600 ? false : true)
    }
  },
  watch: {
    watchLoggedInStat(curValue, oldValue) {
      if (!this.loggedInUser) {
        this.$router.replace('/welcome')
      }
    }
  },
  created() {
    if(this.isLoggedIn) {
     this.loadCalendar()
    }
  },
  methods: {
    ...mapActions('notes', ['getCalendarInfo']),
    async loadCalendar() {
      this.getCalendarInfo()
    },
  }
}
</script>

<style lang="sass" scoped>
.side-card
  border-radius: 10px
  //height: 210px

.calendar-position
  margin: 0 auto
</style>
