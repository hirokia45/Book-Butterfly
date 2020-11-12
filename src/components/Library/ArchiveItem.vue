<template>
  <q-item
    :class="!archive.completed ? 'bg-grey-4' : 'bg-yellow-4'">
    <q-item-section>{{archive.volumeInfo.title}}</q-item-section>

    <q-item-section side>
      {{ archive.updatedAt | displayDate }}
    </q-item-section>

    <q-item-section side>
      <div class="row">
        <q-btn
          @click="promptToMoveBack(_id)"
          flat
          round
          dense
          class="q-mr-xs"
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
  methods: {
    ...mapActions('books', ['moveBook', 'removeMyBook']),

    promptToRemove(_id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Do you really want to remove this book from your bookshelf and archive?',
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
        title: 'Confirm',
        message: 'Do you want to move this book back to shelf?',
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
      return date.formatDate (value, 'YY M/D h:mma')
    }
  }
}
</script>
