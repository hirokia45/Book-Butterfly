
const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        redirect: "/home",
        meta: { authRequired: true }
      },
      {
        path: "/auth/signup",
        component: () => import("pages/PageSignup.vue")
      },
      {
        path: "/auth/login",
        component: () => import("pages/PageLogin.vue")
      },
      {
        path: "/home",
        component: () => import("pages/PageHome.vue"),
        meta: { authRequired: true }
      },
      {
        path: "/notes/:_id",
        props: true,
        component: () => import("pages/PageSingleNote.vue"),
        meta: { authRequired: true }
      },
      {
        path: "/notes/:_id/camera",
        props: true,
        component: () => import("pages/PageCamera.vue"),
        meta: { authRequired: true }
      },
      {
        path: "/library",
        component: () => import("pages/PageLibrary.vue"),
        meta: { authRequired: true }
      },
      {
        path: "/notifications",
        component: () => import("pages/PageNotifications.vue"),
        meta: { authRequired: true }
      },
      {
        path: "/profile",
        component: () => import("pages/UserProfile.vue"),
        meta: { authRequired: true }
      },
      {
        path: "/settings",
        component: () => import("pages/PageSettings.vue"),
        meta: { authRequired: true }
      },
      {
        path: "/welcome",
        component: () => import("pages/PageWelcome.vue")
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes
