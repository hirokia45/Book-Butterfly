<template>
  <q-card class="absolute full-width">
    <modal-header>Edit Profile</modal-header>

    <form @submit.prevent="submitForm">
      <q-card-section class="q-pt-none">

        <div class="row q-mb-sm">
          <q-input
            outlined
            class="col"
            v-model="profileToSubmit.name"
            :rules="[val => !!val || 'Field is required!']"
            label="Username"
            autofocus
          />
        </div>

        <div class="row q-mb-sm">
          <q-input
            outlined
            v-model="profileToSubmit.email"
            :rules="[
              val => !!val || 'Field is required!',
              val => isValidEmailAddress(val) || 'Please enter a valid email address'
            ]"
            ref="email"
            label="Email"
            lazy-rules
            class="col"
          />
        </div>

        <div class="row q-mb-sm">
          <q-input
            outlined
            type="password"
            v-model="profileToSubmit.password"
            :rules="[
              val => val.length >= 6 || 'Please enter at least 6 characters',
              val => val !== 'password' || 'Password cannot be password',
            ]"
            ref="password"
            label="Password"
            lazy-rules
            class="col"
          />
        </div>

        <div class="row q-mb-sm">
          <q-input
            outlined
            class="col"
            v-model="profileToSubmit.favoriteBook"
            label="Favorite Book" />
        </div>

        <modal-button></modal-button>
      </q-card-section>
    </form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'
import ModalHeader from './GeneralModalComponents/ModalHeader'
import ModalButton from './GeneralModalComponents/ModalButton'

export default {
  components: {
    ModalHeader,
    ModalButton
  },
  props:['user', '_id'],
  data() {
    return {
      profileToSubmit: {}
    }
  },
  methods: {
    ...mapActions('auth', ['updateProfile']),

    isValidEmailAddress(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },

    submitForm() {
      //this.$q.loading.show()

      this.updateProfile({
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
