<template>
  <div class="col-auto">
    <q-fab
      class="isVisible"
      @click.stop="toggleActionList()"
      color="grey-7"
      direction="left"
      flat
      icon="eva-more-horizontal"
      round
      style="z-index:2"
    >
      <q-fab-action
        @click="promptToDelete(_id)"
        class="danger-gradient-background"
        icon="eva-trash-2-outline"
        text-color="grey-10"
      />
      <q-fab-action
        @click="showEditNote = true"
        class="primary-gradient-background"
        icon="eva-edit-outline"
        text-color="grey-10"
      />
      <q-fab-action
        class="primary-gradient-background"
        icon="eva-camera-outline"
        text-color="grey-10"
      />
    </q-fab>

    <q-dialog v-model="showEditNote">
      <edit-note
        @close="showEditNote = false"
        :note="note"
        :_id="_id"
      />
    </q-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import EditNote from '../../Modals/EditNote'

export default {
  components: {
    EditNote
  },
  props: ['note', '_id'],
  data() {
    return {
      isVisible: false,
      showEditNote: false
    }
  },
  methods: {
    ...mapActions('notes', ['deleteNote']),
    promptToDelete(_id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure? You cannot see the note anymore!',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.deleteNote(_id)
        console.log(this.$route.path)
        if (this.$route.path !== '/home') {
          this.$router.push('/home')
        }
      })

    },
    toggleActionList() {
      this.isVisible = !this.isVisible
    }
  }
}
</script>
