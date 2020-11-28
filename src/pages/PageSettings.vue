<template>
  <q-page>
    <div class="q-pa-md absolute fit">
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
          </q-item>

          <q-item>
            <q-item-section>{{ $t('backgroundSync' )}}</q-item-section>
            <template v-if="backgroundSyncSupported">
              <q-item-section avatar>
                <q-avatar color="positive" text-color="white" icon="eva-sync-outline" />
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
          class="rounded-borders bg-white"
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
          </q-item>

          <q-item
            @click="emailMe"
            disable
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
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { openURL } from "quasar"

export default {
  data() {
    return {
      langOptions: [
        { value: 'en-us', label: 'English' },
        { value: 'ja', label: '日本語'}
      ]
    }
  },
  computed: {
    ...mapState('system', ['lang']),
    ...mapGetters('system', ['backgroundSyncSupported']),
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
    visitMyWebsite() {
      openURL()
    },
    emailMe() {
      window.location.href = 'mailto:...com?subject=Book Butterfly Feedback'
    }
  }
}
</script>
