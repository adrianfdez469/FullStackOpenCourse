import { useEffect } from 'react'
import { connect } from 'react-redux'
import { removeNotification } from '../reducers/notificationReducer'

const Notification = (props) => {
  
  const { notification, clear } = props
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    ...(!notification && {display: 'none'})
  }

  useEffect(() => {
    if(notification){
      const timeOutId = setTimeout(() => {
        clear()
      }, notification.time)      
      return () => {
        clearTimeout(timeOutId)
      }
    }
    
  }, [notification, clear])

  return (
    <div style={style}>
      {notification?.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const mapDispatchToProps = {
  clear: removeNotification
}


const conectedNotification = connect(mapStateToProps, mapDispatchToProps)(Notification)

export default conectedNotification