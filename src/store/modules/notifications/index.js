import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const getDefaultNotificationState = () => {
  return {
    notifications: [],
    totalNotificationsUnconfirmed: null
  };
}

export default {
  namespaced: true,
  state: getDefaultNotificationState(),
  mutations,
  actions,
  getters
}
