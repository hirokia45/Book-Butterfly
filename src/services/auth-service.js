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
}

export default new AuthService()
