import axios from 'axios'
import { Notify } from 'quasar';
import authHeader from './auth-header'
import { i18n } from "../boot/i18n"

class AuthService {
  async login(user) {
    try {
      const response = await axios.post(`${process.env.API}/auth/login`, {
        email: user.email,
        password: user.password
      });
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      Notify.create({
        type: 'positive',
        message: i18n.t('loginSuccess'),
        position: "top"
      });
      return response.data;
    } catch (err) {
      console.error(err.response.data)

      let errorMessage = ''
      if (err.response.data.message === "A user with this email could not be found...") {
        errorMessage = i18n.t('loginError1')
      } else if (err.response.data.message === "Wrong password!") {
        errorMessage = i18n.t('loginError2')
      }
      Notify.create({
        color: "red",
        message: errorMessage,
        position: "top"
      });
      const error = new Error('login Failure')
      throw error
    }
  }

  async logout(user) {
    const response = await axios.post(`${process.env.API}/auth/logout`, { user: user }, { headers: authHeader() })
    localStorage.removeItem('user')

    Notify.create({
      type: "positive",
      message: i18n.t('logoutSuccess'),
      position: "top"
    });

    return response.data
  }

  async signup(user) {
    const lang = i18n.locale;
    try {
      await axios.put(`${process.env.API}/auth/signup`, {
        name: user.name,
        email: user.email,
        password: user.password,
        lang
      });

      const response = await axios.post(`${process.env.API}/auth/login`, {
        email: user.email,
        password: user.password
      });
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      Notify.create({
        type: "positive",
        message: i18n.t('signupSuccess'),
        position: "top"
      });
      return response.data;
    } catch (err) {
      console.error(err.response.data);
      Notify.create({
        color: 'red',
        message: err.response.data.message,
        position: 'top'
      })
    }
  }

  async updateProfile(updates) {
    const updatingProfile = updates.updates

    try {
      const response = await axios.patch(`${process.env.API}/users/me`, updatingProfile, { headers: authHeader() })
      localStorage.removeItem("user");
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      Notify.create({
        type: "positive",
        message: i18n.t('profileUpdateSuccess'),
        position: "top"
      })
      return response.data
    } catch (err) {
      console.log(err.response.data);
      Notify.create({
        color: "red",
        message: err.response.data.message,
        position: "top"
      })
    }
  }

  async updateAvatar(updates) {

    let formData = new FormData();
    formData.append( "file", updates.updates.avatar, updates.updates._id + ".png");
    console.log(...formData.entries());

    try {
      const response = await axios.put(`${process.env.API}/users/me/avatar`, formData, { headers: authHeader() })
      localStorage.removeItem("user");
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      console.log('userUpdated data in localstorage');

      Notify.create({
        type: "positive",
        message: i18n.t('avatarUpdateSuccess'),
        position: "top"
      })
      return response.data
    } catch (err) {
      console.error(err.response.data);
      Notify.create({
        color: "red",
        message: err.response.data.message,
        position: "top"
      })
    }
  }
}

export default new AuthService()
