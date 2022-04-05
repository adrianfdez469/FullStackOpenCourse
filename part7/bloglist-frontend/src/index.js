import React from 'react'
import ReactDOM from 'react-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import notificationReducer from './reducers/notificationReducers'
import authReducer from './reducers/authReducers'
import blogReducers from './reducers/blogReducers'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    auth: authReducer,
    blogs: blogReducers,
    users: usersReducer
  }
})

ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'))