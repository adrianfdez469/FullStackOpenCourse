import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../../reducers/authReducers'
import { getUser } from '../../reducers/authReducers'


const useAuth = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.auth)

  const onLogin = (values) => {
    const { username, password } = values
    dispatch(login(username, password))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  useEffect(() => {
    dispatch(getUser())
  }, [])

  return {
    logout: handleLogout,
    onLogin,
    user
  }
}

export default useAuth