import React, { useEffect } from 'react'

const Notification = ({ message, error=true, clearMessage }) => {


  useEffect(() => {
    if(message !== ''){
      const timer = setTimeout(() => {
        clearMessage()
      }, 4000)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [message, clearMessage])


  if(message === ''){
    return null
  }

  const notificationStyle = {
    borderRadius: '5px',
    backgroundColor: error ? 'bisque' : 'rgba(70, 230, 70, 0.5)',
    padding: '5px',
    color: error ? 'coral' : 'green',
    fontSize: '1.2rem',
    fontWeight: 600,
    border: error ? '1px solid coral' : '1px solid green',
    margin: '5px'
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification