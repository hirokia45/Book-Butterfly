import axios from 'axios'
import authHeader from './auth-header'

class AuthService {
  async login(user) {
    const response = await axios.post(`${process.env.API}/auth/login`, {
      email: user.email,
      password: user.password
    })
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
  }

  async logout(user) {
    const response = await axios.post(`${process.env.API}/auth/logout`, { user: user }, { headers: authHeader() })
    localStorage.removeItem('user')

    return response.data
  }

  async signup(user) {
    await axios.put(`${process.env.API}/auth/signup`, {
      name: user.name,
      email: user.email,
      password: user.password
    })

    const response = await axios.post(`${process.env.API}/auth/login`, {
      email: user.email,
      password: user.password
    });
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data
  }
}

export default new AuthService()
