<template>
  <div class="constrain-more">
    <div class="row justify-center">
      <the-search-bar />
      <q-btn
        class="q-ml-sm"
        color="grey-10"
        flat
        icon="eva-trash-2-outline"
        round
      />
    </div>

    <the-scroll-area>
      <q-list bordered separator>
        <q-item clickable v-ripple>
          <q-item-section>Single line item</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label>Item with caption</q-item-label>
            <q-item-label caption>Caption</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label overline>OVERLINE</q-item-label>
            <q-item-label>Item with caption</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </the-scroll-area>

  </div>
</template>
