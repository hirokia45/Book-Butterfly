import notifications from ".";

const getDefaultNotificationState = () => {
  return {
    notifications: [],
    totalNotificationsUnconfirmed: null
  }
}

export default {
  /*
    Called on logout
  */
  resetNotificationState(state) {
    console.log("resetNotificationState in mutations");
    Object.assign(state, getDefaultNotificationState());
  },


  /*
    General Notifications related mutations
  */
  setNotifications(state, notifications) {
    state.notifications = notifications
  },

  setTotalNotificationsUnconfirmed(state, totalNotificationsUnconfirmed) {
    state.totalNotificationsUnconfirmed = totalNotificationsUnconfirmed
  },

  toggleConfirmationStatus(state, confirmationStatus) {
    const updatingNotification = state.notifications.find(noti => noti._id === confirmationStatus._id)

    Object.assign(updatingNotification, confirmationStatus)
  },

  // Called after confimation status changed
  recalculateCount(state) {
    state.totalNotificationsUnconfirmed = state.notifications.filter(noti => noti.confirmed === false).length
    console.log(totalNotificationsUnconfirmed);
  },

  removeNotification(state, _id) {
    state.notifications = state.notifications.filter(noti => {
      return noti._id !== _id;
    })
  }
}
