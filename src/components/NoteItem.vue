<template>
  <q-card class="note-card q-mb-md" flat bordered>
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/boy-avatar.png">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-bold">{{ note.userName }}</q-item-label>
        <q-item-label caption>
          {{ note.date | actualDate}}
        </q-item-label>
      </q-item-section>

      <q-item-section side>
          <div class="col-auto">
            <q-fab color="grey-7" round flat icon="eva-more-horizontal" direction="left">
              <q-fab-action
                @click.stop="promptToDelete(id)"
                class="danger-gradient-background"
                icon="eva-trash-2-outline"
                text-color="grey-10"
              />
              <q-fab-action

                class="primary-gradient-background"
                icon="eva-edit-outline"
                text-color="grey-10"
              />
            </q-fab>
          </div>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section>
      <div class="text-bold">{{ note.title }}</div>
      <div class="text-caption">Author: {{ note.author }}</div>
      <p class="q-mb-none text-caption">Page: <span>{{ note.pageFrom }}</span>-<span>{{ note.pageTo }}</span></p>
      <div class="text-caption">Category: {{ note.category }}</div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      {{ note.comment }}
    </q-card-section>

  </q-card>
</template>

<script>
import { date } from 'quasar'
import { mapActions } from 'vuex'

export default {
  props: ['note', 'id'],
  methods: {
    ...mapActions('notes', ['deleteTask']),
    promptToDelete(id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure? You cannot see the note anymore!',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.deleteTask(id)
      })
    }
  },
  filters: {
    actualDate(value) {
      return date.formatDate(value, 'ddd MM/DD/YYYY hh:mm:ss A')
    }
  }
}
</script>
