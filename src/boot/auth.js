export default ({ router }) => {
  router.beforeEach(function (to, _, next) {
    console.log('beforeEach');
    const loggedIn = localStorage.getItem('user')
    if (to.meta.authRequired && !loggedIn) {
      console.log('Metadata: ');
      next('/auth/login')
    } else {
      console.log('else');
      next()
    }
  })
}
