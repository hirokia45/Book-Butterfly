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
            />Settings</q-item-label>
          <q-separator />

          <q-item>
            <q-item-section>Background Sync Supported</q-item-section>
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

          <q-item>
            <q-item-section>Language</q-item-section>
          </q-item>

          <q-item>
            <q-item-section>Push Notification</q-item-section>
          </q-item>

          <q-item>
            <q-item-section>Set Alarm</q-item-section>
          </q-item>
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
            />More
          </q-item-label>

          <q-separator />
          <q-item
            to="/settings/help"
            tag="label"
            v-ripple>
            <q-item-section>
              <q-item-label>Help</q-item-label>
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
              <q-item-label>Visit My Website</q-item-label>
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
              <q-item-label>Email Me!!</q-item-label>
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
import { mapGetters } from 'vuex'
import { openURL } from "quasar"

export default {
  computed: {
    ...mapGetters('system', ['backgroundSyncSupported'])
  },
  methods: {
    visitMyWebsite() {
      openURL()
    },
    emailMe() {
      window.location.href = 'mailto:...com?subject=Book Butterfly Feedback'
    }
  }
}
</script>
