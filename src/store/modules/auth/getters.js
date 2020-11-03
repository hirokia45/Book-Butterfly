export default {
  isLoggedIn(state) {
    return state.status.loggedIn
  },
  loggedInUser(state) {
    return state.user.user
  }
}
