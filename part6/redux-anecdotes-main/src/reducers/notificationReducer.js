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
export default notificationReducer.reducer