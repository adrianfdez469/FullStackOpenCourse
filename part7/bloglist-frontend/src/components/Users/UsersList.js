import React, { useEffect } from 'react'
import { useSelector, useDispatch }   from 'react-redux'
import { loadAll } from '../../reducers/usersReducer'
import { Link } from 'react-router-dom'

const UserBlogsRow = ({ user }) => {
  return (
    <tr>
      <td><Link to={`${user.id}`} >{user.name}</Link></td>
      <td>{user.blogs.length}</td>
    </tr>
  )
}

const UsersList = () => {

  const dispatch = useDispatch()
  const users = useSelector(state => state.users )

  useEffect(() => {
    dispatch(loadAll())
  }, [])

  return (
    <>
      <h1>User</h1>
      <table>
        <thead>
          <tr>
            <td></td>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (<UserBlogsRow key={user.id} user={user} />))}
        </tbody>
      </table>
    </>
  )

}
export default UsersList