import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      const miliseconds = (action.payload.time || 3) * 1000
      const error = !!action.payload.error
      console.log(action.payload)
      return { message: action.payload.message, error: error, time: miliseconds }
    },
    clearNotification() {
      return null
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions


export default notificationSlice.reducer