import React, { useState } from 'react'
import Notification from './Notification'
import loginService from '../services/login'

const Login = ({ notification, clearNotificationMsg, setUser, setNotification }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = (event) => {
    event.preventDefault()
    loginService.login({ username, password })
      .then(data => {
        setUser(data)
      })
      .catch(err => {
        console.log(err)
        if(err.response.status === 401){
          setNotification({
            message: 'Wrong username or passawor',
            error: true
          })
        }
      })
  }

  return (
    <>
      <h1>Login to application</h1>
      <Notification message={notification.message} clearMessage={clearNotificationMsg}/>
      <form onSubmit={(event) => onLogin(event)}>
        <div>Username: <input value={username} onChange={({ target }) => setUsername(target.value)}/></div>
        <div>Password <input value={password} onChange={({ target }) => setPassword(target.value)}/></div>
        <div>Username: <button type={'submit'}>Login</button></div>

      </form>
    </>
  )

}
export default Login