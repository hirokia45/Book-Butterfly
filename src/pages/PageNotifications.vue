<template>
  <q-page>
    <div class="q-pa-md absolute fit">
      <base-scroll-area>
        <div class="constrain-more">

          <q-list bordered class="rounded-borders bg-white">
            <q-item-label class="text-h6 text-center" header>
              <q-icon
                class="q-mr-sm"
                name="eva-email-outline"
                size="sm"
              />{{ $t('notifications') }}
            </q-item-label>
            <q-separator />

            <transition-group
              appear
              leave-active-class="animated zoomOut"
            >
              <notification-item
                v-for="notification in notifications"
                :key="notification._id"
                :_id="notification._id"
                :notification="notification"
              />
            </transition-group>

          </q-list>
        </div>
      </base-scroll-area>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PageNotifications',
  components: {
    BaseScrollArea: () => import('../components/Layouts/BaseScrollArea'),
    NotificationItem: () => import('../components/Notifications/NotificationItem')
  },
  computed: {
    ...mapGetters('notifications', ['notifications']),
  },
  created() {
    this.loadNotifications()
  },
  methods: {
    ...mapActions('notifications', ['getNotifications', 'getTotalNotificationsUnconfirmed']),
    loadNotifications() {
      this.getNotifications()
      this.getTotalNotificationsUnconfirmed()
    }
  }
}
</script>
