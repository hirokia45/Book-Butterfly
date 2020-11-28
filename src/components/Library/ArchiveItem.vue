<template>
  <q-item
    :class="!archive.completed ? 'bg-grey-4' : 'bg-yellow-4'"
    class="row">
    <div class="col-11 col-sm-10 row justify-between">
      <q-item-section class="col-sm-8 col-12">{{archive.volumeInfo.title}}</q-item-section>

      <q-item-section side class="col-sm-3 col-12">
        {{ archive.updatedAt | displayDate }}
      </q-item-section>
    </div>

    <q-item-section class="col-1 col-sm-2">
      <div class="row justify-end">
        <q-btn
          @click="promptToMoveBack(_id)"
          flat
          round
          dense
          :class="{'q-mr-xs': isDesktop}"
          icon="eva-undo-outline"
          color="light-blue-6"
        />
        <q-btn
          @click="promptToRemove(_id)"
          flat
          round
          dense
          icon="eva-trash-2-outline"
          color="red-6"
        />
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
import { mapActions } from 'vuex'
import { date } from 'quasar'

export default {
  props: ['_id', 'archive'],
  computed: {
    isDesktop() {
      return (window.innerWidth > 600 ? true : false)
    }
  },
  methods: {
    ...mapActions('books', ['moveBook', 'removeMyBook']),

    promptToRemove(_id) {
      this.$q.dialog({
        title:  this.$t('confirm'),
        message: this.$t('removeBook1'),
        cancel: true,
        persistent: true
      }).onOk(() => {
        const info = {
          _id: this._id,
          mode: 'archive'
        }
        this.removeMyBook(info)
      })
    },

    promptToMoveBack(archive) {
      this.$q.dialog({
        title:  this.$t('confirm'),
        message: this.$t('moveBook1'),
        cancel: true,
        persistent: true
      }).onOk(() => {
          const archive = !this.archive.archive
          const info = {
          updates: {
            _id: this.archive._id,
            archive
          },
          mode: 'shelf'
        }
        this.moveBook(info)
        this.$emit('close')
      })
    }
  },
  filters: {
    displayDate(value) {
      const { formatDate } = date
      return date.formatDate (value, 'YYYY M/D h:mma')
    }
  }
}
</script>
