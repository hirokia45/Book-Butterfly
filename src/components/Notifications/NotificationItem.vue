<template>
  <div>
    <q-item class="q-mt-sm row">
      <q-item-section class="column justify-center" avatar top>
        <q-avatar
          :color="notification.color"
          :icon="notification.icon"
          :text-color="notification.textColor"
        />
      </q-item-section>

      <q-item-section top>
        <q-item-label caption lines="1">
          {{ notification.createdAt | displayDate }}
        </q-item-label>
        <q-item-label lines="1">
          <span class="text-weight-medium">{{ notification.title }}</span>
        </q-item-label>
        <q-item-label caption lines="1">
          {{ notification.message }}
        </q-item-label>
      </q-item-section>

      <q-item-section class="column justify-center" top side>
        <div class="text-grey-8 q-gutter-xs">
          <q-btn
            @click="promptToToggleStatus"
            class="gt-xs"
            :color="!notification.confirmed ? 'grey-10' : 'green-14' "
            dense
            flat
            icon="eva-checkmark-circle-outline"
            round
            size="16px"
          />
          <q-btn
            @click="promptToDeleteNotifications(_id)"
            class="gt-xs"
            dense
            flat
            icon="eva-trash-2-outline"
            round
            size="16px"
          />
        </div>
      </q-item-section>
    </q-item>

    <q-separator spaced />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { date } from 'quasar'

export default {
  props: ['_id', 'notification'],
  methods: {
    ...mapActions('notifications', ['toggleConfirmationStatus', 'removeNotification']),
    promptToToggleStatus() {
      const confirmed = !this.notification.confirmed
      const updates = {
        _id: this.notification._id,
        confirmed
      }
      this.toggleConfirmationStatus(updates)
    },
    promptToDeleteNotifications(_id) {
      this.removeNotification(_id)
    }
  },
  filters: {
    displayDate(value) {
      const { formatDate } = date
      return date.formatDate(value, 'ddd M/D YYYY h:mmA')
    },
  }
}
</script>
