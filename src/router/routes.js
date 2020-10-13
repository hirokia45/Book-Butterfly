
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PageHome.vue') },
      { path: '/profile', component: () => import('pages/UserProfile.vue') },
      { path: '/library', component: () => import('pages/PageLibrary.vue') },
      { path: '/notifications', component: () => import('pages/PageNotifications.vue') },
      { path: '/welcome', component: () => import('pages/PageWelcome.vue') },
      { path: '/auth', component: () => import('pages/UserAuth.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
