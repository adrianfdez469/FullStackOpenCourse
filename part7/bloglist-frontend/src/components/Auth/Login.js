import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../reducers/authReducers'

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const onLogin = (event) => {
    event.preventDefault()
    dispatch(login( username, password ))
  }

  return (
    <>
      <h1>Login to application</h1>
      <form data-testid="loginform" onSubmit={(event) => onLogin(event)}>
        <div>Username: <input value={username} onChange={({ target }) => setUsername(target.value)}/></div>
        <div>Password <input type='password' value={password} onChange={({ target }) => setPassword(target.value)}/></div>
        <div>Username: <button type={'submit'}>Login</button></div>
      </form>
    </>
  )

}
export default Login