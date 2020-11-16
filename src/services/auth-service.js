import axios from 'axios'
import { Notify } from 'quasar';
import authHeader from './auth-header'

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
        message: 'Login Success!',
        position: "top"
      });
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      Notify.create({
        color: "red",
        message: err.response.data.message,
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
      message: "Logged out",
      position: "top"
    });

    return response.data
  }

  async signup(user) {
    try {
      await axios.put(`${process.env.API}/auth/signup`, {
        name: user.name,
        email: user.email,
        password: user.password
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
        message: "New Account Created!",
        position: "top"
      });

      return response.data;
    } catch (err) {
      console.log(err.response.data);
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
        message: "Profile Updated!",
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
        message: "Avatar Updated!",
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
}

export default new AuthService()
