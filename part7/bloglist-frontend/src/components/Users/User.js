import React from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'


const UserBlogItem = ({ blog }) => {
  return (
    <li>{blog.title}</li>
  )
}

const User = () => {

  const { id: userId } = useParams()
  const user = useSelector(state => state.users.find(u => u.id === userId))
  if(!user)
    return null

  return (
    <>
      <h1>{user.name}</h1>
      <ul>
        {user.blogs.map(blog => (<UserBlogItem key={blog.id} blog={blog} />))}
      </ul>
    </>
  )

}
export default User