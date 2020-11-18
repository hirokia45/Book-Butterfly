const getDefaultSystemState = () => {
  return {
    backgroundSyncSupported: false,
    serviceWorkerSupported: false
  }
}

const mutations = {
  setBackgroundSyncSupported(state, value) {
    state.backgroundSyncSupported = value
  },
  setServiceWorkerSupported(state, value) {
    state.serviceWorkerSupported = value
  }
}

const actions = {
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
  }
}

const getters = {
  backgroundSyncSupported(state) {
    return state.backgroundSyncSupported
  },

  serviceWorkerSupported(state) {
    return state.serviceWorkerSupported
  }
}

export default {
  namespaced: true,
  state: getDefaultSystemState(),
  mutations,
  actions,
  getters
}
