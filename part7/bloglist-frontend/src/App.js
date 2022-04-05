import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getUser } from './reducers/authReducers'

import Notification from './components/Utils/Notification'
import Blog from './components/Blogs/Blogs'
import Login from './components/Auth/Login'

const App = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.auth)
  console.log(user)
  useEffect(() => {
    dispatch(getUser())
  }, [])

  return (
    <>
      <Notification />
      {user
        ? <Blog user={user} />
        : <Login />}
    </>
  )
}

export default App