import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import BlogList from './BlogList'
import BlogForm from './BlogForm'
import Notification from './Notification'
import blogService from '../services/blogs'

const Blog = ({ user, logout, notification, clearNotificationMsg, setNotification }) => {

  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const addBlog = (blogData) => {
    setBlogs(bls => {
      return [...bls, blogData]
    })
  }

  const onLikeBlog = (blog) => {
    const { id, user, ...dataBlog } = blog
    const payload = {
      ...dataBlog,
      user: user.id,
      likes: dataBlog.likes + 1
    }
    blogService.updateBlog(id, payload)
      .then(() => {
        setBlogs(bls => {
          return [...bls.filter(b => b.id !== id), { ...blog, id, user, likes: blog.likes + 1 }]
        })
      })
      .catch(err => {
        console.log(err)
        setNotification({
          message: 'Error!',
          error: true
        })
      })
  }
  const onDeleteBlog = (blog) => {
    if(window.confirm(`Remove blog ${blog.name} by ${blog.author}`)){
      blogService.deleteBlog(blog.id, user.token)
        .then(() => {
          setBlogs(blgs => blgs.filter(b => b.id !== blog.id))
        })
        .catch(err => {
          if(err.response.status === 403){
            setNotification({
              message: 'Only the owner of the blog can delete it!',
              error: true
            })
          }else{
            console.log(err)
            setNotification({
              message: 'Error!',
              error: true
            })
          }
        })
    }
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notification.message} error={notification.error}  clearMessage={clearNotificationMsg}/>
      <div>{user.name} logged in <button onClick={logout}>Logout</button></div>
      <BlogForm
        user={user}
        addBlog={addBlog}
        setNotification={setNotification}
      />
      <br/>
      <BlogList blogs={blogs} user={user} onLikeBlog={onLikeBlog} onDeleteBlog={onDeleteBlog}/>
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  logout: PropTypes.func.isRequired,
  notification: PropTypes.shape({
    messaege: PropTypes.string,
    error: PropTypes.bool
  }).isRequired,
  clearNotificationMsg: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default Blog