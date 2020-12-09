<template>
  <q-page>
    <div class="q-pa-md absolute fit">
      <base-scroll-area>
        <div class="constrain-more">
          <q-list
            bordered
            padding
            class="q-mb-md rounded-borders bg-white"
          >
            <q-item-label class="text-center text-h6" header>
              <q-icon
                class="q-mr-xs"
                name="eva-settings-2-outline"
                size="sm"
              />{{ $t('settings') }}</q-item-label>
            <q-separator />

            <q-item>
              <q-item-section>{{ $t('language1') }}</q-item-section>

              <q-select
                v-model="displayIn"
                :options="langOptions"
                dense
                borderless
                emit-value
                map-options
                options-dense
                style="min-width: 80px"
              />
            </q-item>

            <q-item>
              <q-item-section>{{ $t('pushNotification') }}</q-item-section>
              <q-item-section side >
                <q-toggle
                  v-model="pushNotificationsSetting"
                  color="green"
                  val="pushNoti"
                  @input="changeNotificationsSetting"
                />
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>{{ $t('backgroundSync' )}}</q-item-section>
              <template v-if="backgroundSyncSupported">
                <q-item-section avatar>
                  <q-avatar color="positive" text-color="white" icon="eva-sync-outline">
                    <q-tooltip
                      content-class="bg-amber text-black shadow-4"
                      content-style="font-size: 14px"
                      max-width="250px"
                      transition-show="rotate"
                      transition-hide="rotate"
                    >
                      {{ $t('backgroundSyncInfo1' )}}
                    </q-tooltip>
                  </q-avatar>
                </q-item-section>
              </template>
              <template v-else>
                <q-item-section avatar>
                  <q-avatar color="negative" text-color="white" icon="eva-alert-triangle" />
                </q-item-section>
              </template>
            </q-item>

            <!-- <q-item>
              <q-item-section>Set Alarm</q-item-section>
            </q-item> -->
          </q-list>

          <q-list
            bordered
            padding
            class="q-mb-md rounded-borders bg-white"
          >
            <q-item-label class="text-center text-h6" header>
              <q-icon
                class="q-mr-xs"
                name="eva-question-mark-circle-outline"
                size="sm"
              />{{ $t('more1') }}
            </q-item-label>

            <q-separator />
            <q-item
              to="/settings/help"
              tag="label"
              v-ripple>
              <q-item-section>
                <q-item-label>{{ $t('help') }}</q-item-label>
              </q-item-section>

              <q-item-section side >
                <q-icon name="eva-chevron-right-outline" />
              </q-item-section>
            </q-item>

            <q-item
              @click="visitMyWebsite"
              disable
              tag="label"
              v-ripple>
              <q-item-section>
                <q-item-label>{{ $t('myWebSite') }}</q-item-label>
              </q-item-section>

              <q-item-section side >
                <q-icon name="eva-chevron-right-outline" />
              </q-item-section>

              <q-tooltip
                content-class="bg-amber text-black shadow-4"
                content-style="font-size: 14px"
                max-width="250px"
                anchor="top middle"
                transition-show="rotate"
                transition-hide="rotate"
              >
                {{ $t('apology') }}
              </q-tooltip>
            </q-item>

            <q-item
              @click="emailMe"
              tag="label"
              v-ripple>
              <q-item-section>
                <q-item-label>{{ $t('emailMe') }}</q-item-label>
              </q-item-section>

              <q-item-section side >
                <q-icon name="eva-chevron-right-outline" />
              </q-item-section>
            </q-item>

          </q-list>

          <q-list
            bordered
            padding
            class="q-mb-md rounded-borders bg-white"
          >
            <q-item-label class="text-center text-h6" header>
              <q-icon
                class="q-mr-xs"
                name="eva-globe-outline"
                size="sm"
              />{{ 'SNS' }}
            </q-item-label>

            <q-separator />

            <q-card
              flat
              style="height: 80px"
            >
              <div class="row justify-center q-pa-sm">
                <q-btn
                  type="a"
                  href="https://twitter.com/hiroki_blackcat"
                  target="_blank"
                  color="blue"
                  size="xl"
                  flat
                  icon="eva-twitter"
                  round
                />

                <q-btn
                  type="a"
                  href="https://www.wantedly.com/id/hiroki_amada"
                  target="_blank"
                  size="xl"
                  flat
                  round
                >
                  <q-avatar>
                    <img src="https://book-buttefly-static-images.s3-ap-northeast-1.amazonaws.com/wantedly_mark.png">
                  </q-avatar>
                </q-btn>
              </div>
            </q-card>

          </q-list>
        </div>
      </base-scroll-area>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { openURL } from "quasar"

export default {
  components: {
    BaseScrollArea: () => import('../components/Layouts/BaseScrollArea')
  },
  data() {
    return {
      langOptions: [
        { value: 'en-us', label: 'English' },
        { value: 'ja' || 'ja-jp', label: '日本語'}
      ],
      isNotificationsPermitted: false
    }
  },
  computed: {
    ...mapState('system', ['lang']),
    ...mapGetters('system', ['backgroundSyncSupported']),
    pushNotificationsSetting: {
      get() {
        if (!("Notification" in window)) {
          return 'Not Supported'
        }
        else if (Notification.permission === "granted") {
          this.isNotificationsPermitted = true
          return this.isNotificationsPermitted
        }
        else if (Notification.permission === "denied" || Notification.permission === "default") {
          this.isNotificationsPermitted = false
          return this.isNotificationsPermitted
        }
      },
      set(value) {
        this.isNotificationsPermitted = value
      }
    },
    displayIn: {
      get() {
        return this.lang
      },
      set(value) {
        this.setLanguage(value)
      }
    }
  },
  methods: {
    ...mapActions('system', ['setLanguage']),
    changeNotificationsSetting() {
      if (("Notification" in window)) {
        if (Notification.permission === "granted") {
          this.$q.dialog({
            title:  this.$t('info'),
            message: this.$t('notificationsSettingAdvice'),
            persistent: true
          })
        }
        else if (Notification.permission === "denied" || Notification.permission === "default") {
          Notification.requestPermission().then((permission) => {
            this.pushNotificationsSetting = true
          })
        }
      }
    },
    visitMyWebsite() {
      openURL()
    },
    emailMe() {
      window.location.href = 'mailto:hiroki.amada.tech@gmail.com?subject=Book Butterfly Feedback'
    }
  }
}
</script>
