import AuthService from '../../../services/auth-service'
import { Loading } from 'quasar'

export default {
  async login({ commit }, user) {
    try {
      const response = await AuthService.login(user)
      await commit('loginSuccess', response)
    } catch (err) {
      console.error(err)
      await commit('loginFailure')
    }
  },

  async logout({ commit, dispatch }) {
    Loading.show();
    try {
      await AuthService.logout()

      await commit('logoutSuccess')
      console.log("logout success");
      dispatch('notes/resetNoteState', null, { root: true })
      dispatch('books/resetBookState', null, { root: true })

      Loading.hide()
    } catch (err) {
      console.error('logout err', err);
      console.log('logout fail');
      await commit('logoutFailure')
      throw new Error('Logout error')
      Loading.hide()
    }
  },

  async signup({ commit }, user) {
    try {
      const response = await AuthService.signup(user)
      commit('signupSuccess')
      const responseUser = response.user
      commit('loginSuccess', responseUser)
    } catch (err) {
      console.log(err);
      commit('signupFailure')
      throw new Error('Signup error')
    }
  },

  async forcedLogout({ commit, dispatch }) {
    try {
      await commit('logoutSuccess')
      await dispatch('notes/resetNoteState', null, { root: true })
      await dispatch('notes/resetBookState', null, { root: true })
    } catch (err) {
      console.log(err);
    }
  },

  async updateProfile({ commit }, updates) {
    try {
      const response = await AuthService.updateProfile(updates)
      commit('updateProfileSuccess', response)

    } catch (err) {
      console.error(err)
    }
  },

  async updateAvatar({ commit }, updates) {
    try {
      const response = await AuthService.updateAvatar(updates)
      commit('updateProfileSuccess', response)
    } catch (err) {
      console.error(err)
    }
  }
}
