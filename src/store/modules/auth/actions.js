import AuthService from '../../../services/auth-service'

export default {
  async login({ commit }, user) {
    try {
      const response = await AuthService.login(user)
      commit('loginSuccess', response)
    } catch (err) {
      commit('loginFailure')
    }
  },

  async logout({ commit, dispatch }) {
    try {
      await AuthService.logout()

      await commit('logoutSuccess')
      console.log("logout success");
      await dispatch('notes/resetNoteState', null, { root: true })

    } catch (err) {
      console.error('logout err', err);
      console.log('logout fail');
      await commit('logoutFailure')
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
  }
}
