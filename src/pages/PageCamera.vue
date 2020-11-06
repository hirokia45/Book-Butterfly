<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height">
      <the-scroll-area>
        <div class="constrain-more">
          <div class="camera-frame q-pa-md bg-white">
            <video
              v-show="!imageCaptured"
              ref="video"
              class="full-width"
              autoplay
            />
            <canvas
              v-show="imageCaptured"
              ref="canvas"
              class="full-width"
              height="240"
            />
          </div>
          <div class="text-center q-pa-md">
            <q-btn
              v-if="hasCameraSupport && cameraToggle"
              @click="captureImage"
              :disable="imageCaptured"
              round
              size="lg"
              class="primary-gradient-background"
              icon="eva-camera"
            />
            <q-file
              v-else
              v-model="imageUpload"
              @input="captureImageFromFileUpload"
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
          <div class="text-center q-ma-md">
            <q-btn
              @click="submitImage"
              :disable="!note.photo"
              class="primary-gradient-background"
              label="Submit Image"
              rounded
            />
          </div>

          <div class="text-center" v-show="!note.photo">
            <q-toggle
              v-model="cameraToggle"
              checked-icon="eva-camera"
              color="green"
              size="xl"
              unchecked-icon="eva-attach"
              @input="cameraToggledFalse"
            />
          </div>

          <div v-show="hasCameraSupport && cameraToggle && !note.photo"
              class="text-center"
          >
            <q-toggle
              v-model="cameraRear"
              checked-icon="eva-flip-2"
              color="green"
              size="xl"
              unchecked-icon="eva-flip-2"
              @input="toggleCameraFrontRear"
            />
          </div>

          <q-page-sticky
            :offset="[18, 18]"
            class="add-button bottom-right"
            style="z-index: 3"
          >
            <q-btn
              @click="$router.go(-1)"
              class="grey-gradient-background shadow-5 text-grey-8"
              fab
              icon="eva-arrow-back"
            />
          </q-page-sticky>
        </div>
      </the-scroll-area>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
require('md-gum-polyfill')
import TheScrollArea from '../components/Layouts/TheScrollArea'


export default {
  name: 'PageCamera',
  components: {
    TheScrollArea
  },
  props: ['_id'],
  data() {
    return {
      note: {
        _id: this._id,
        // owner: '',
        // createdAt: '',
        // title: '',
        // author: '',
        // category: '',
        // pageFrom: null,
        // pageTo: null,
        // comment: '',
        photo: null
      },
      imageUpload: [],
      imageCaptured: false,
      hasCameraSupport: true,
      cameraToggle: true,
      cameraRear: true
    }
  },
  // created() {
  //   this.loadSingleNote(this._id)
  // },
  methods: {
    ...mapActions('notes', ['addImage']),

    initCamera() {
      navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: { exact: 'environment'}
        }
      }).then(stream => {
        this.$refs.video.srcObject = stream
      }).catch(error => {
        this.hasCameraSupport = false
      })
    },

    captureImage() {
      let video = this.$refs.video
      let canvas = this.$refs.canvas
      canvas.width = video.getBoundingClientRect().width
      canvas.height = video.getBoundingClientRect().height
      let context = canvas.getContext('2d')
      context.drawImage(video, 0, 0, canvas.width, canvas.height)
      this.imageCaptured = true
      this.note.photo = this.dataURItoBlob(canvas.toDataURL())
      this.disableCamera()
    },

    captureImageFromFileUpload(file) {
      this.note.photo = file

      let canvas = this.$refs.canvas
      let context = canvas.getContext('2d')

      let reader = new FileReader();
      reader.onload = (event) => {
        let img = new Image()
        img.onload = () => {
          canvas.width = img.width
          canvas.height = img.height
          context.drawImage(img, 0, 0)
          this.imageCaptured = true
        }
        img.src = event.target.result
      }
      reader.readAsDataURL(file)
    },

    disableCamera() {
      this.$refs.video.srcObject.getVideoTracks().forEach(track => {
        track.stop()
      })
    },

    dataURItoBlob(dataURI) {
      var byteString = atob(dataURI.split(',')[1]);
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      var blob = new Blob([ab], {type: mimeString});
      return blob
    },

    cameraToggledFalse(cameraToggle) {
      if (!cameraToggle) {
        this.disableCamera()
      } else {
        this.cameraRear = true
        this.initCamera()
      }
    },

    toggleCameraFrontRear(cameraRear) {
      if (cameraRear) {
        navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { exact: 'environment'}
          }
        }).then(stream => {
        this.$refs.video.srcObject = stream
      })
      } else {
        navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { exact: 'user'}
          }
        }).then(stream => {
        this.$refs.video.srcObject = stream
      })
      }
    },

    submitImage() {
      this.$q.loading.show()

      this.addImage({
        _id: this._id,
        updates: this.note
      })
      this.$router.push(`/notes/${this._id}`)

      this.$q.loading.hide()
    }
  },
  mounted() {
    this.initCamera()
  },
  beforeDestroy() {
    if (this.hasCameraSupport) {
      this.disableCamera()
    }
  }
}
</script>

<style lang="sass">
.camera-frame
  border: 2px solid $grey-10
  border-radius: 10px

.file-picker-field
  border: 2px solid $grey-10
  border-radius: 10px
</style>
