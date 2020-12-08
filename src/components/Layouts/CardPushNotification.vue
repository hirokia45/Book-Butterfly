<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <q-card flat class="bg-grey-2 text-grey-10 q-mb-md">

      <q-card-section class="text-grey-10">
        <div class="row">
          <q-avatar
            square
            size="75px"
            class="q-mx-lg"
          >
            <img src="icons/icon-128x128.png">
          </q-avatar>
          <div class="text-subtitle text-grey-8 column justify-center">{{$t('pushNotificationMessage1')}}</div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="around">
       <q-btn
          @click="enableNotifications"
          icon="eva-bell-outline"
          class="q-px-sm"
          dense
          flat
          :label="$t('yes')"
        />
        <q-btn
          @click="$emit('hideNotificationsBanner')"
          icon="eva-clock-outline"
          class="q-px-sm"
          dense
          flat
          :label="$t('later')"
        />
        <q-btn
          @click="neverShowNotificationsBanner"
          icon="eva-bell-off-outline"
          class="q-px-sm"
          dense
          flat
          :label="$t('never')"
        />
      </q-card-actions>
    </q-card>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('system', ['serviceWorkerSupported', 'pushNotificationsSupported'])
  },
  methods: {
    ...mapActions('notifications', ['createSubscription']),
    enableNotifications() {
      if (this.pushNotificationsSupported) {
        Notification.requestPermission(result => {
          this.neverShowNotificationsBanner()
          if (result === 'granted') {
            //this.displayGrantedNotification()
            this.checkForExistingPushSubscription()
          }
        })
      }
    },

    checkForExistingPushSubscription() {
      if (this.serviceWorkerSupported && this.pushNotificationsSupported)
      {
        let reg
        navigator.serviceWorker.ready.then(swreg => {
          reg = swreg
          return swreg.pushManager.getSubscription()
        }).then(sub => {
          if (!sub) {
            this.createPushSubscription(reg)
          }

        })
      }
    },

    createPushSubscription(reg) {
      let vapidPublicKey = 'BACOjx1HkxM7V3NRi5wzWScfW3PuLsVmUZAGNq6F5JBcgz5cenPrzKZOvmtihLBGX6PikmNwckBRPL795tNGt0Q'
      let vapidPublicKeyConverted = this.urlBase64ToUnit8Array(vapidPublicKey)
      reg.pushManager.subscribe({
        applicationServerKey: vapidPublicKeyConverted,
        userVisibleOnly: true
      }).then(newSub => {
        let newSubData = newSub.toJSON()
        this.createSubscription(newSubData)
      }).then(response => {
        this.displayGrantedNotification()
      }).catch(err => {
        console.log('err: ', err);
      })
    },

    displayGrantedNotification() {
      if (this.serviceWorkerSupported && this.pushNotificationsSupported)
      {
        navigator.serviceWorker.ready.then(swreg => {
          swreg.showNotification('You are subscribed to notifications!!', {
            body: 'Thank you for subscribing!!',
            icon: 'icons/icon-128x128.png',
            image: 'icons/icon-128x128.png',
            badge: 'icons/icon-128x128.png',
            dir: 'ltr',
            vibrate: [100, 50, 200],
            tag: 'confirm-notification',
            renotify: true,
          })
        })
      }
    },

    neverShowNotificationsBanner() {
      this.$emit('hideNotificationsBanner')
      this.$q.localStorage.set('neverShowNotificationsBanner', true)
    },

    urlBase64ToUnit8Array(base64String) {
      const padding = '='.repeat((4 - base64String.length % 4) % 4);
      const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }
  }
}
</script>
