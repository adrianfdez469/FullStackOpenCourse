import { useEffect } from 'react'
import { useSelector, useDispatch }   from 'react-redux'
import { loadAll } from '../../reducers/usersReducer'

const useUsers = () => {

  const dispatch = useDispatch()
  const users = useSelector(state => state.users.map(user => ({ ...user, cant: user.blogs.length })) )

  const getUserById = (userId) => {
    return users.find(u => u.id === userId)
  }


  useEffect(() => {
    dispatch(loadAll())
  }, [])

  return {
    users,
    getUserById
  }

}
export default useUsers