export default {
  loginSuccess(state, user) {
    state.status.loggedIn = true
    console.log('mutation: ', state.status);
    console.log('user', user);
    state.user = user
    console.log('state', state.user);
  },
  loginFailure(state) {
    state.status.loggedIn = false
    state.user = null
  },
  logoutSuccess(state) {
    state.status.loggedIn = false
    state.user = null
  },
  logoutFailure(state) {
    state.status.loggedIn = true
  },
  signupSuccess(state) {
    state.status.loggedIn = false
  },
  signupFailure(state) {
    state.status.loggedIn = false
  },
  updateProfileSuccess(state, updatedUser) {
    state.user = updatedUser
  }
}
