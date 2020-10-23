
const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/", redirect: "/home"
      },
      {
        path: "/home", component: () => import("pages/PageHome.vue")
      },
      {
        path: "/notes/:_id", props: true, component: () => import("pages/PageSingleNote.vue")
      },
      {
        path: "/notes/:_id/camera", props: true, component: () => import("pages/PageCamera.vue")
      },
      {
        path: "/library", component: () => import("pages/PageLibrary.vue")
      },
      {
        path: "/notifications",
        component: () => import("pages/PageNotifications.vue")
      },
      {
        path: "/profile", component: () => import("pages/UserProfile.vue")
      },
      {
        path: "/settings", component: () => import("pages/PageSettings.vue")
      },
      {
        path: "/welcome", component: () => import("pages/PageWelcome.vue")
      },
      {
        path: "/auth", component: () => import("pages/UserAuth.vue")
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
