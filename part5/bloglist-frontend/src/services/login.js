import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/login'

const login = (payload) => {
  const req = axios.post(baseUrl, payload)
  return req.then(resp => {
    window.localStorage.setItem('blogListUser', JSON.stringify(resp.data))
    return resp.data
  })
}

const logout = () => {
  window.localStorage.removeItem('blogListUser')
}

const exp = { login, logout }
export default exp