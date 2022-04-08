import React from 'react'
import { useParams } from 'react-router'
import useUsers from './useUsers'

const User = () => {

  const { id: userId } = useParams()
  const { getUserById } = useUsers()
  const user = getUserById(userId)
  if(!user)
    return null

  return (
    <>
      <h1>{user.name}</h1>
      <ul>
        {user.blogs.map(blog => (<li key={blog.id}>{blog.title}</li>))}
      </ul>
    </>
  )

}
export default User