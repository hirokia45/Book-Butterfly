const getDefaultSystemState = () => {
  return {
    backgroundSyncSupported: false,
    serviceWorkerSupported: false,
    pushNotificationsSupported: false
  }
}

const mutations = {
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
