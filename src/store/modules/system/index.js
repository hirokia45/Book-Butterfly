const getDefaultSystemState = () => {
  return {
    backgroundSyncSupported: false
  }
}

const mutations = {
  setBackgroundSyncSupported(state, payload) {
    state.backgroundSyncSupported = payload
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
    console.log('backgroundSyncSupported: ', backgroundSyncSupported)
    commit("setBackgroundSyncSupported", backgroundSyncSupported)
  }
}

const getters = {

}

export default {
  namespaced: true,
  state: getDefaultSystemState(),
  mutations,
  actions,
  getters
}
