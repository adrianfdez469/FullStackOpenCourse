import { createSlice } from '@reduxjs/toolkit'

const notificationReducer = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification(state, action){
      return action.payload
    },
    removeNotification(state, action){
      return null
    }
  }
})

export const { showNotification, removeNotification } = notificationReducer.actions


export const setNotification = (text, time) => {
  return async dispatch => {
    const timeInMiliseconds = time * 1000
    dispatch(showNotification(text))
    setTimeout(() => {
      dispatch(removeNotification())
    }, timeInMiliseconds)
  }
}

export default notificationReducer.reducer