<template>
  <q-card class="absolute full-width">
    <modal-header>Edit Avatar</modal-header>

    <form @submit.prevent="submitForm">
      <q-card-section class="q-pt-none">
        <div class="row q-mb-sm">
          <div class="image-frame q-pa-md bg-white" v-show="fileUploaded">
            <canvas
              ref="canvas"
              class="full-width"
              height="240"
            />
          </div>
        </div>

        <div class="row q-mb-sm">
          <q-file
            v-model="imageUpload"
            @input="captureImageFileUpload"
            class="bg-white file-picker-field"
            accept="image/*"
            label="Choose an image"
            outlined
          >
            <template v-slot:prepend>
              <q-icon name="eva-attach-outline" />
            </template>
          </q-file>
        </div>

        <modal-button></modal-button>
      </q-card-section>
    </form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  components: {
    ModalHeader: () => import('./GeneralModalComponents/ModalHeader'),
    ModalButton: () => import('./GeneralModalComponents/ModalButton')
  },
  props:['user', '_id'],
  data() {
    return {
      profileToSubmit: {},
      imageUpload: [],
      fileUploaded: false,
    }
  },
  methods:{
    ...mapActions('auth', ['updateAvatar']),

    captureImageFileUpload(file) {
      this.profileToSubmit.avatar = file

      let canvas = this.$refs.canvas
      let context = canvas.getContext('2d')

      let reader = new FileReader()
      reader.onload = (event) => {
        let img = new Image()
        img.onload = () => {
          canvas.width = img.width
          canvas.height = img.height
          context.drawImage(img, 0, 0)
          this.fileUploaded = true
        }
        img.src = event.target.result
      }
      reader.readAsDataURL(file)
    },

    submitForm() {
      //this.$q.loading.show()

      this.updateAvatar({
        updates: this.profileToSubmit
      })
      this.$emit('close')

      //this.$q.loading.hide()
    }

  },
  mounted() {
    this.profileToSubmit = Object.assign({}, this.user)
  }
}
</script>

<style lang="sass" scoped>
.image-frame
  border: 2px solid $grey-10
  border-radius: 10px
  margin: 0 auto

.file-picker-field
  border: 2px solid $grey-10
  border-radius: 10px
</style>
