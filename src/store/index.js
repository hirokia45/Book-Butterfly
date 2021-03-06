import Vue from 'vue'
import Vuex from 'vuex'

import notes from './modules/notes/index'
import auth from './modules/auth/index'
import books from './modules/books/index'
import system from './modules/system/index'
import notifications from './modules/notifications/index'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      notes,
      auth,
      books,
      system,
      notifications
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
