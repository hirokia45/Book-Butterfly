<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height">
      <div class="constrain-more">
        <q-list
          bordered
          padding
          class="q-mb-md rounded-borders bg-white">
          <q-item-label header>Settings</q-item-label>

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
        </q-list>

        <q-list
          bordered
          padding
          class="rounded-borders bg-white"
        >
          <q-item-label header>More</q-item-label>

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
            @click="visitOurWebsite"
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

export default {
  computed: {
    ...mapGetters('system', ['backgroundSyncSupported'])
  }
}
</script>
