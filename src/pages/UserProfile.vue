<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height">
      <the-scroll-area>
        <div class="constrain-some">
          <div class="row q-col-gutter-lg">

            <div class="col-12 col-sm-6 fixed-height">
              <q-card class="full-height">
                <q-card-section class="row q-pt-lg q-pb-sm">
                  <img :src="loggedInUser.avatar" class="avatar">

                  <div class="absolute-bottom text-right q-pa-sm">
                    <q-btn
                      @click="showEditAvatar = true"
                      round
                      flat
                      class="grey-gradient-background"
                      size="md"
                      icon="eva-image-outline"
                      style="right: 10px; bottom: -20px"
                    />
                  </div>
                </q-card-section>

                <q-card-section class="q-px-lg">
                  <div class="text-h6 text-center text-weight-bold">{{ loggedInUser.name}}</div>

                  <div class="row q-mt-sm user-items">
                  	<div class="text-h7 text-weight-bold q-pl-md">Email</div>
                    <q-space></q-space>
                  	<div class="text-h7 float-right q-pr-md">{{ loggedInUser.email}}</div>
                  </div>

                  <div class="row q-mt-md user-items">
                  	<div class="text-h7 text-weight-bold q-pl-md">Member since...</div>
                    <q-space></q-space>
                  	<div class="text-h7 float-right q-pr-md">{{ memberSince }}</div>
                  </div>

                  <div class="row q-mt-md user-items">
                  	<div class="text-h7 text-weight-bold q-pl-md">Favorite book</div>
                    <q-space></q-space>
                  	<div class="text-h7 float-right q-pr-md">{{ loggedInUser.favoriteBook }}</div>
                  </div>

                </q-card-section>

                <q-card-actions align="center">
                  <q-btn
                    @click="showEditProfile = true"
                    class="primary-gradient-background center q-px-md"
                    label="Edit Profile"
                    rounded
                    flat
                  />
                </q-card-actions>
              </q-card>
            </div>

            <div class="col-12 col-sm-6">
              <div>
                <q-card>
                  <note-calendar class="shadow-2 calendar-position"></note-calendar>
                </q-card>

              </div>

              <div class="side-card q-mt-lg settings-mobile">
                <q-card class="full-height"></q-card>
              </div>

            </div>

          </div>

        </div>
      </the-scroll-area>
    </div>

    <q-dialog v-model="showEditAvatar">
      <edit-avatar
        @close="showEditAvatar = false"
        :user="loggedInUser"
        :_id="loggedInUser._id"
      />
    </q-dialog>

    <q-dialog v-model="showEditProfile">
      <edit-profile
        @close="showEditProfile = false"
        :user="loggedInUser"
        :_id="loggedInUser._id"
      />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { date } from 'quasar'
import TheScrollArea from '../components/Layouts/TheScrollArea'
import NoteCalendar from '../components/Notes/NoteCalendar'
import EditAvatar from '../components/Modals/EditAvatar'
import EditProfile from '../components/Modals/EditProfile'

export default {
  name: 'UserProfile',
  components: {
    NoteCalendar,
    TheScrollArea,
    EditAvatar,
    EditProfile
  },
  data() {
    return {
      showEditAvatar: false,
      showEditProfile: false
    }
  },
  watch: {
    watchLoggedInStat(curValue, oldValue) {

      if (!this.loggedInUser) {
        this.$router.replace('/welcome')
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['loggedInUser', 'isLoggedIn']),
    memberSince() {
      const timeInData = this.loggedInUser.createdAt
      const convertedTime = new Date(timeInData)
      return date.formatDate(convertedTime, 'YYYY M/D')
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
.fixed-height
  height: 525px

.avatar
  margin: 0 auto
  border-radius: 10px
  display: block;
  object-fit: cover
  height: 200px
  width: 250px

.user-items
  padding-bottom: 4px
  border-bottom: 1px solid #cccccc

.side-card
  border-radius: 10px
  height: 210px

.calendar-position
  margin: 0 auto

.settings-mobile
  @media (max-width: $breakpoint-xs-max)
    margin-bottom: 35px


</style>
