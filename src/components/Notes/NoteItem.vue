<template>

    <q-card
      tabindex="0"
      class="note-card q-mb-md"
      bordered
      flat
    >
      <div @mouseup="toSingleNotePage($event)" class="cursor-pointer">
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold">{{ note.owner }}</q-item-label>
            <q-item-label caption>
              {{ note.createdAt | actualDate}}
            </q-item-label>
          </q-item-section>

          <q-item-section side>
              <div class="col-auto">
                <q-fab color="grey-7" round flat icon="eva-more-horizontal" direction="left"
                style="z-index:1">
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
              </div>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-card-section>
          <div class="text-bold">{{ note.title }}</div>
          <div
            v-if="note.author"
            class="text-caption"
          >Author: {{ note.author }}</div>
          <p
            v-if="note.pageFrom || note.pageTo "
            class="q-mb-none text-caption"
          >
            Page: <span>{{ note.pageFrom }}</span>-<span>{{ note.pageTo }}</span>
          </p>
          <div
            v-if="note.category"
            class="text-caption"
          >
            Category: {{ note.category }}
          </div>
        </q-card-section>

        <q-separator v-if="note.comment" />

        <q-card-section v-if="note.comment" >
          {{ note.comment }}
        </q-card-section>
      </div>

      <q-dialog v-model="showEditNote">
        <edit-note
          @close="showEditNote = false"
          :note="note"
          :_id="_id"
        />
      </q-dialog>

    </q-card>

</template>

<script>
import { date } from 'quasar'
import { mapActions } from 'vuex'
import EditNote from '../Modals/EditNote'

export default {
  components: {
    EditNote
  },
  props: ['note', '_id'],
  data() {
    return {
      showEditNote: false,
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
      })
    },
    toSingleNotePage(event) {
      this.$router.push(`/notes/${this._id}`)
    }
  },
  filters: {
    actualDate(value) {
      return date.formatDate(value, 'ddd MM/DD/YYYY hh:mm:ss A')
    }
  }
}
</script>
