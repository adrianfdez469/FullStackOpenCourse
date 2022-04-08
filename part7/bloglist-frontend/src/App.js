import React from 'react'
import useAuth from './components/hooks/useAuth'
import AppRoutes from './components/Routes'
import Login from './components/Login/Login'
import './App.css'

const App = () => {

  const { user } = useAuth()

  return (
    <>
      {user
        ? <AppRoutes />
        : <Login />}
    </>
  )
}

export default App