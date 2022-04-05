import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { setNotification } from './notificationReducers'


const authSlice = createSlice({
  name: 'auth',
  initialState: null,
  reducers: {
    setUser(_state, action) {
      return action.payload // name, username, token, id
    },
    logout() {
      loginService.logout()
      return null
    },
    getUser() {
      return loginService.getUser()
    }
  }
})

export const { setUser, logout, getUser } = authSlice.actions

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      dispatch(setUser(user))
      dispatch(setNotification({ message: `User ${user.name} is logged in!` }))
    } catch(err) {
      console.log(err)
      //dispatch(setUser(null))
      let errormsg = ''
      if(!err.response){
        errormsg = 'There is no response from server!'
      } else if(err.response.status === 401){
        errormsg = 'Wrong username or password'
      } else {
        errormsg = 'Something went wrong. Contact to the administrator!'
      }
      dispatch(setNotification({ message: errormsg, error: true, time: 5 }))
    }
  }
}


export default authSlice.reducer