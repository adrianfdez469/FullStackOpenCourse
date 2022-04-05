import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearNotification } from '../../reducers/notificationReducers'


const Notification = () => {

  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    if(notification){
      const timer = setTimeout(() => {
        dispatch(clearNotification())
      }, notification.time)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [notification])


  if(!notification){
    return null
  }

  const notificationStyle = {
    borderRadius: '5px',
    backgroundColor: notification.error ? 'bisque' : 'rgba(70, 230, 70, 0.5)',
    padding: '5px',
    color: notification.error ? 'coral' : 'green',
    fontSize: '1.2rem',
    fontWeight: 600,
    border: notification.error ? '1px solid coral' : '1px solid green',
    margin: '5px'
  }

  return (
    <div data-testid="notification" style={notificationStyle}>
      {notification.message}
    </div>
  )
}

export default Notification