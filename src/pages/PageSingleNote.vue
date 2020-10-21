<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height">

      <div class="constrain">
        <q-card class="note-card q-mb-md" flat bordered>
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-bold">{{ singleNote.owner }}</q-item-label>
              <q-item-label caption>
                {{ singleNote.createdAt | actualDate}}
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
                    <q-fab-action
                      link
                      :to="noteDetailsLink"
                      class="primary-gradient-background"
                      icon="eva-file-outline"
                      text-color="grey-10"
                    />
                  </q-fab>
                </div>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-card-section>
            <div class="text-bold">{{ singleNote.title }}</div>
            <div
              v-if="singleNote.author"
              class="text-caption"
            >Author: {{ singleNote.author }}</div>
            <p
              v-if="singleNote.pageFrom || singleNote.pageTo "
              class="q-mb-none text-caption"
            >
              Page: <span>{{ singleNote.pageFrom }}</span>-<span>{{ singleNote.pageTo }}</span>
            </p>
            <div
              v-if="singleNote.category"
              class="text-caption"
            >
              Category: {{ singleNote.category }}
            </div>
          </q-card-section>

          <q-separator v-if="singleNote.comment" />

          <q-card-section v-if="singleNote.comment" >
            {{ singleNote.comment }}
          </q-card-section>

          <q-dialog v-model="showEditNote">
            <edit-note
              @close="showEditNote = false"
              :note="note"
              :_id="_id"
            />
          </q-dialog>

        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['_id'],
  data() {
    return {
      singleNote: {
        owner: '',
        created: '',
        title: '',
        author: '',
        category: '',
        pageFrom: null,
        pageTo: null,
        comment: ''
      },
    }
  },
  created() {
    this.loadSingleNote(this._id)
  },
  methods: {
    async loadSingleNote(_id) {
      try {
        const response = await this.$axios.get(`${process.env.API}/notes/${_id}`)
        console.log(response);
        const resData = {
          owner: response.data.note.owner,
          createdAt: response.data.note.createdAt,
          title: response.data.note.title,
          author: response.data.note.author,
          category: response.data.note.category,
          pageFrom: response.data.note.pageFrom,
          pageTo: response.data.note.pageTo,
          comment: response.data.note.comment
        }
        console.log('resSingleNote: ', resData);
        this.singleNote = resData

        if (!response.status === 200) {
          const error = new Error(response.message || "Failed to fetch...");
          throw error;
        }
      } catch (err) {
        this.err = err.message || 'Something went wrong....'
      }
    }
  }
}
</script>
