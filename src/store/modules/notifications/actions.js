import axios from 'axios'
let qs = require('qs')
import authHeader from "../../../services/auth-header"

export default {
  /*
    called on logout
  */
  resetNotificationState({ commit }) {
    commit("resetNotificationState")
  },

  /*
    General Notifications related actions
  */
  async getNotifications({ commit }) {
    try {
      const response = await axios.get(`${process.env.API}/notifications`, { headers: authHeader() })

      response.data.notifications.forEach(noti => {
        let timeInData = noti.createdAt
        noti.createdAt = new Date(timeInData)
      })

      const notifications = response.data.notifications
      commit("setNotifications", notifications)
    } catch (err) {
      console.error("error: ", err)
    }
  },

  async getTotalNotificationsUnconfirmed({ commit }) {
    try {
      const response = await axios.get(`${process.env.API}/notifications/count`, {
        headers: authHeader()
      })
      const totalNotificationsUnconfirmed = response.data.totalNotificationsUnconfirmed
      commit("setTotalNotificationsUnconfirmed", totalNotificationsUnconfirmed)
    } catch (err) {
      console.error("error: ", err)
    }
  },

  async toggleConfirmationStatus({ commit }, updates) {
    try {
      const response = await axios.patch(
        `${process.env.API}/notifications/confirmation`, updates,
        { headers: authHeader() })
      const confirmationStatus = response.data.result
      commit("toggleConfirmationStatus", confirmationStatus)
      commit("recalculateCount")
    } catch (err) {
      console.error("error: ", err)
    }
  },

  async removeNotification({ commit }, _id) {
    try {
      await axios.delete(
        `${process.env.API}/notifications/${_id}`, { headers: authHeader() })

      commit("removeNotification", _id)
    } catch (err) {
      console.error("error: ", err)
    }
  },

  /*
    Push Notifications related actions
  */
  async createSubscription({ commit }, newSubData) {
    const newSubDataQS = qs.stringify(newSubData);
    try {
      const response = await axios.post(
        `${process.env.API}/subscriptions?${newSubDataQS}`,
        null,
        { headers: authHeader() }
      );

      console.log("response: ", response)
    } catch (err) {
      console.error("error: ", err)
    }
  }
};
