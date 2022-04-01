import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { removeNotification } from '../reducers/notificationReducer'

const Notification = () => {
  
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    ...(!notification && {display: 'none'})
  }

  useEffect(() => {
    if(notification)
        setTimeout(() => {
          dispatch(removeNotification())
        }, 5000)
  }, [notification, dispatch])

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification