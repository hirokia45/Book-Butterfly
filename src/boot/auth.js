export default ({ router }) => {
  router.beforeEach(function (to, _, next) {
    const loggedIn = localStorage.getItem('user')
    if (to.meta.authRequired && !loggedIn) {
      next('/auth/login')
    } else {
      next()
    }
  })
}
