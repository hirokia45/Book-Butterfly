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

  async logout({ commit }) {
    try {
      await AuthService.logout()
      commit('logoutSuccess')
    } catch (err) {
      commit('logoutFailure')
    }
  },

  async signup({ commit }, user) {
    try {
      const response = await AuthService.signup(user)
      commit('signupSuccess', response)
    } catch (err) {
      commit('signupFailure')
    }
  }
}
