import { i18n } from '../../../boot/i18n'

const lang = JSON.parse(localStorage.getItem("lang"))
const getDefaultSystemState = () => {
  return {
    lang: lang || i18n.locale,
    backgroundSyncSupported: false,
    serviceWorkerSupported: false,
    pushNotificationsSupported: false
  }
}

const mutations = {
  setLanguage(state, value) {
    state.lang = value
  },
  setBackgroundSyncSupported(state, value) {
    state.backgroundSyncSupported = value
  },
  setServiceWorkerSupported(state, value) {
    state.serviceWorkerSupported = value
  },
  setPushNotificationsSupported(state, value) {
    state.pushNotificationsSupported = value
  }
}

const actions = {
  setLanguage({ commit }, value) {
    localStorage.setItem("lang", JSON.stringify(value))
    commit("setLanguage", value)
  },

  checkSystemAvailabilities({ dispatch }) {
    dispatch("checkBackgroundSyncSupported")
    dispatch("checkServiceWorkerSupported")
    dispatch("checkPushNotificationsSupported")
  },

  checkBackgroundSyncSupported({ commit }) {
    let backgroundSyncSupported;
    if ("serviceWorker" in navigator && "SyncManager" in window) {
      backgroundSyncSupported = true
    } else {
      backgroundSyncSupported = false
    }
    commit("setBackgroundSyncSupported", backgroundSyncSupported)
  },

  checkServiceWorkerSupported({ commit }) {
    let serviceWorkerSupported;
    if ("serviceWorker" in navigator) {
      serviceWorkerSupported = true
    } else {
      serviceWorkerSupported = false
    }
    commit("setServiceWorkerSupported", serviceWorkerSupported)
  },

  checkPushNotificationsSupported({ commit }) {
    let pushNotificationsSupported;
    if ("PushManager" in window) {
      pushNotificationsSupported = true
    } else {
      pushNotificationsSupported = false
    }
    commit("setPushNotificationsSupported", pushNotificationsSupported)
  }
}

const getters = {
  lang(state) {
    return state.lang
  },

  backgroundSyncSupported(state) {
    return state.backgroundSyncSupported
  },

  serviceWorkerSupported(state) {
    return state.serviceWorkerSupported
  },

  pushNotificationsSupported(state) {
    return state.pushNotificationsSupported
  }
}

export default {
  namespaced: true,
  state: getDefaultSystemState(),
  mutations,
  actions,
  getters
}
