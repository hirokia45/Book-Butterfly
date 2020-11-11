<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height">
      <the-scroll-area>
        <div class="constrain-more">
          <q-card
            class="my-card text-white"
            style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
          >
            <q-card-section>
              <div class="text-h6">Our Changing Planet</div>
              <div class="text-subtitle2">by John Doe</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus magni praesentium nihil tenetur laudantium reiciendis excepturi! Minima nulla eveniet deleniti corporis optio, ex, veniam, pariatur natus amet magni eos alias.
            </q-card-section>
          </q-card>

        </div>
      </the-scroll-area>
    </div>
  </q-page>
</template>

<script>
import TheScrollArea from '../components/Layouts/TheScrollArea'

export default {
  name: 'PageNotifications',
  components: {
    TheScrollArea
  }
}
</script>
