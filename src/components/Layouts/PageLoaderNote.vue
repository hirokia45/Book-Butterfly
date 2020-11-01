<template>
  <q-card flat bordered>
    <q-item class="q-pt-md">
      <q-item-section avatar>
        <q-skeleton type="QAvatar" animation="fade"
        size="40px" />
      </q-item-section>

      <q-item-section>
        <q-item-label>
          <q-skeleton type="text" animation="fade" />
        </q-item-label>
        <q-item-label caption>
          <q-skeleton type="text" animation="fade" />
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-card-section>
      <q-skeleton type="text" class="text-subtitle2" animation="fade" />
      <q-skeleton type="text" width="50%" class="text-subtitle2" animation="fade" />
    </q-card-section>

    <q-card-section>
      <q-skeleton height="200px" square animation="fade" />
    </q-card-section>

  </q-card>
</template>
