<template>
  <q-card class="absolute full-width">
    <modal-header>{{$t('editProfileHeader')}}</modal-header>

    <form @submit.prevent="submitForm">
      <q-card-section class="q-pt-none">

        <div class="row q-mb-sm">
          <q-input
            outlined
            class="col"
            v-model="profileToSubmit.name"
            :rules="[val => !!val || $t('fieldRequired')]"
            :label="$t('username')"
            autofocus
          />
        </div>

        <div class="row q-mb-sm">
          <q-input
            outlined
            v-model="profileToSubmit.email"
            :rules="[
              val => !!val || $t('fieldRequired'),
              val => isValidEmailAddress(val) || $t('emailValidation')
            ]"
            ref="email"
            :label="$t('email')"
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
              val => val.length >= 6 || $t('passwordValidationLength'),
              val => val !== 'password' || $t('passwordValidationPassword'),
            ]"
            ref="password"
            :label="$t('password')"
            lazy-rules
            class="col"
          />
        </div>

        <div class="row q-mb-sm">
          <q-input
            outlined
            class="col"
            v-model="profileToSubmit.favoriteBook"
            :label="$t('favoriteBook')" />
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
