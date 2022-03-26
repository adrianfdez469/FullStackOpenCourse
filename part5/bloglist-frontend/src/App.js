import React, { useState } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import loginService from './services/login'

const App = () => {

  const [user, setUser] = useState()
  const [notification, setNotification] = useState({ message: '', error: false })

  const clearNotificationMsg = () => {
    setNotification({ message: '', error: false })
  }

  const logout = () => {
    loginService.logout()
    setUser(null)
    clearNotificationMsg()
  }

  return user
    ? <Blog
      user={user}
      logout={logout}
      setNotification={setNotification}
      notification={notification}
      clearNotificationMsg={clearNotificationMsg}
    />
    : <Login
      notification={notification}
      setNotification={setNotification}
      clearNotificationMsg={clearNotificationMsg}
      setUser={setUser}
    />
}

export default App