<template>
  <div>
    <q-card class="full-height">
      <q-card-section class="row q-pt-lg q-pb-sm">
        <template>
          <template v-if="loggedInUser.avatar">
            <img :src="loggedInUser.avatar" class="avatar">
          </template>
          <template v-else>
            <img src="../../assets/default-avatar.png" class="avatar">
          </template>
        </template>

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
          <div class="text-h7 text-weight-bold q-pl-md">{{$t('email')}}</div>
          <q-space></q-space>
          <div class="text-h7 float-right q-pr-md">{{ loggedInUser.email}}</div>
        </div>

        <div class="row q-mt-md user-items">
          <div class="text-h7 text-weight-bold q-pl-md">{{$t('memberSince')}}</div>
          <q-space></q-space>
          <div class="text-h7 float-right q-pr-md">{{ memberSince }}</div>
        </div>

        <div class="row q-mt-md user-items">
          <div class="text-h7 text-weight-bold q-pl-md">{{$t('favoriteBook')}}</div>
          <q-space></q-space>
          <div class="text-h7 float-right q-pr-md">{{ loggedInUser.favoriteBook }}</div>
        </div>

      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          @click="showEditProfile = true"
          class="primary-gradient-background center q-px-md"
          :label="$t('editProfileButton')"
          rounded
          flat
        />
      </q-card-actions>
    </q-card>

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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { date } from 'quasar'

export default {
  components: {
    EditAvatar: () => import('../Modals/EditAvatar'),
    EditProfile: () => import('../Modals/EditProfile')
  },
  props: ['loggedInUser'],
  data() {
    return {
      showEditAvatar: false,
      showEditProfile: false
    }
  },
  computed: {
    memberSince() {
      const timeInData = this.loggedInUser.createdAt
      const convertedTime = new Date(timeInData)
      return date.formatDate(convertedTime, 'YYYY M/D')
    }
  },
}
</script>

<style lang="sass" scoped>
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
</style>
