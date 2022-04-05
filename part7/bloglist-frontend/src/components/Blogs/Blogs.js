import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import AppRoutes from '../../AppRoutes'
import { loadBlogs } from '../../reducers/blogReducers'
import { logout } from '../../reducers/authReducers'
import { Link } from 'react-router-dom'


const Blogs = ({ user }) => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadBlogs())
  }, [])

  const navStyle = { backgroundColor: '#ABC', padding: 7 }

  return (
    <div>
      <nav style={navStyle}>
        <Link to='/'>Blogs</Link> |&nbsp;
        <Link to='/users'>Users</Link> |&nbsp;
        {user.name} logged in <button onClick={() => dispatch(logout())}>Logout</button>
      </nav>


      <h2>Blog App</h2>
      <AppRoutes />
    </div>
  )
}

Blogs.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired
}

export default Blogs