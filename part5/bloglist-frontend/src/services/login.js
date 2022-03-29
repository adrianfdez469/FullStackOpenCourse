import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/login'

const login = (payload, setNotification) => {
  const req = axios.post(baseUrl, payload)
  return req.then(resp => {
    window.localStorage.setItem('blogListUser', JSON.stringify(resp.data))
    return resp.data
  })
    .catch(err => {
      if(!err.response && typeof setNotification === 'function'){
        setNotification({
          message: 'There is no response from server!',
          error: true
        })
      } else {
        throw err
      }
    })
}

const logout = () => {
  window.localStorage.removeItem('blogListUser')
}

const getUser = () => {
  const lsData = localStorage.getItem('blogListUser')
  if(lsData){
    const user = JSON.parse(lsData)
    return user
  }
  return null
}

const exp = { login, logout, getUser }
export default exp