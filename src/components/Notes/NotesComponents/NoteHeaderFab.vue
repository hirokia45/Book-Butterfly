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
      <q-fab-action v-if="!note.photo"
        :to="toPageCameraLink"
        :_id="_id"
        class="primary-gradient-background"
        icon="eva-camera-outline"
        text-color="grey-10"
      />
      <q-fab-action v-else
        @click="promptToDeleteImage(_id)"
        class="danger-gradient-background"
        icon="eva-close-square-outline"
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
  computed: {
    toPageCameraLink() {
      return `/notes/${this._id}/camera`
    }
  },
  methods: {
    ...mapActions('notes', ['deleteNote', 'deleteImage']),
    promptToDelete(_id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure? You cannot see the note anymore!',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.deleteNote(_id)
        if (this.$route.path !== '/home') {
          this.$router.push('/home')
        }
      })
    },
    promptToDeleteImage(_id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure? You cannot see the photo anymore!',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.deleteImage(_id)
      })
    },
    toggleActionList() {
      this.isVisible = !this.isVisible
    }
  }
}
</script>
