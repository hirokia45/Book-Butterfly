<template>
  <q-page>
    <div class="absolute fit">
      <base-scroll-area>
        <div class="constrain-more q-pa-md fit">
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
              :label="$t('chooseImage')"
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
              :label="$t('submitImage')"
              rounded
            />
          </div>

          <div class="row justify-center">
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
                class="text-center q-ml-md"
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
          </div>

          <div class="fab-sticky-button">
            <q-btn
              @click="$router.go(-1)"
              fab
              class="grey-gradient-background shadow-5 text-grey-8"
              icon="eva-arrow-back"
            />
          </div>
        </div>
      </base-scroll-area>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
require('md-gum-polyfill')

export default {
  name: 'PageCamera',
  components: {
    BaseScrollArea: () => import('../components/Layouts/BaseScrollArea')
  },
  props: ['_id'],
  data() {
    return {
      note: {
        _id: this._id,
        photo: null
      },
      imageUpload: [],
      imageCaptured: false,
      hasCameraSupport: true,
      cameraToggle: true,
      cameraRear: true,
      curSTREAM: null
    }
  },
  methods: {
    ...mapActions('notes', ['addImage']),

    initCamera() {
      if (this.curSTREAM !== null) {
        this.curSTREAM.getVideoTracks().forEach((camera) => {
          camera.stop()
        })
      }
      navigator.mediaDevices.getUserMedia({
        //video: true,
        video: {
            facingMode: { exact: 'environment'}
        }
      }).then(stream => {
        this.curSTREAM = stream
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

    toggleCameraFrontRear() {
      if (this.curSTREAM !== null) {
        this.curSTREAM.getVideoTracks().forEach((camera) => {
          camera.stop()
        })
      }
      if (this.cameraRear) {
        navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { exact: 'environment'}
          }
        }).then(stream => {
        this.curSTREAM = stream
        this.$refs.video.srcObject = stream
      })
      } else if (!this.cameraRear) {
        navigator.mediaDevices.getUserMedia({
          video: true
          // video: {
          //   facingMode: { exact: 'user'}
          // }
        }).then(stream => {
        this.curSTREAM = stream
        this.$refs.video.srcObject = stream
      }).catch(err => {
        console.error(err);
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
      if (this.$q.platform.is.safari) {
        setTimeout(() => {
          window.location.href = `/notes/${this._id}`
        }, 1000)
      }
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
