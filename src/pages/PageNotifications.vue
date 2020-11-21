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
              />Notifications
            </q-item-label>
            <q-separator />

            <q-item class="q-mt-sm row">
              <q-item-section avatar top>
                <q-avatar color="pink-4" text-color="white" icon="eva-gift-outline" />
              </q-item-section>

              <q-item-section top>
                <q-item-label lines="1">
                  <span class="text-weight-medium">Notification Sample</span>
                </q-item-label>
              </q-item-section>

              <q-item-section class="column justify-center" top side>
                <div class="text-grey-8 q-gutter-xs">
                  <q-btn class="gt-xs" size="12px" flat dense round icon="eva-checkmark-circle-outline" />
                  <q-btn class="gt-xs" size="12px" flat dense round icon="eva-trash-2-outline" />
                </div>
              </q-item-section>
            </q-item>

            <q-separator spaced />

            <q-item class="q-mt-sm row">
              <q-item-section avatar top>
                <q-avatar color="pink-4" text-color="white" icon="eva-gift-outline" />
              </q-item-section>

              <q-item-section top>
                <q-item-label lines="1">
                  <span class="text-weight-medium">Notification Sample</span>
                </q-item-label>
              </q-item-section>

              <q-item-section class="column justify-center" top side>
                <div class="text-grey-8 q-gutter-xs">
                  <q-btn class="gt-xs" size="12px" flat dense round icon="eva-checkmark-circle-outline" />
                  <q-btn class="gt-xs" size="12px" flat dense round icon="eva-trash-2-outline" />
                </div>
              </q-item-section>
            </q-item>

            <q-separator spaced />
          </q-list>

        </div>
      </base-scroll-area>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageNotifications',
  components: {
    BaseScrollArea: () => import('../components/Layouts/BaseScrollArea')
  }
}
</script>
