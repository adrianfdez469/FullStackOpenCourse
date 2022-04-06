import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './reducers/authReducers'
import Blogs from './components/Blogs/Blogs'
import Login from './components/Auth/Login'
import './App.css'

const App = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(getUser())
  }, [])

  return (
    <>
      {user
        ? <Blogs user={user} />
        : <Login />}
    </>
  )
}

export default App