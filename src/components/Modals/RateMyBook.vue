<template>
  <q-card class="full-width">
    <modal-header>Rate this Book</modal-header>

    <form @submit.prevent="submitForm">
      <q-card-section>
        <div class="q-pa-md">
          <div class="q-gutter-y-md text-center">
            <q-rating
              v-model="ratingModel"
              :max="4"
              size="3.5em"
              color="green-5"
              :icon="icons"
            />
          </div>
        </div>
      </q-card-section>

      <modal-button></modal-button>
    </form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  components: {
    ModalHeader: () => import('../Modals/GeneralModalComponents/ModalHeader'),
    ModalButton: () => import('../Modals/GeneralModalComponents/ModalButton')
  },
  props: ['_id', 'myRate'],
  data () {
    return {
      ratingModel: this.myRate,
      icons: [
        'sentiment_very_dissatisfied',
        'sentiment_dissatisfied',
        'sentiment_satisfied',
        'sentiment_very_satisfied'
      ]
    }
  },
  methods: {
    ...mapActions('books', ['updateMyBook']),
    async submitForm () {
      const updates = {
        _id: this._id,
        myRate: this.ratingModel
      }
      try {
        await this.updateMyBook(updates)
        this.$emit('close')
      } catch (err) {
        this.$q.dialog({
          title: 'Error',
          message: 'Could not update the rating'
        })
      }
    }
  }
}
</script>
