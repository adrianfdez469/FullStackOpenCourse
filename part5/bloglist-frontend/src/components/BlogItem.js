import React, { useState } from 'react'

const Blog = ({ blog, user, onLikeBlog, onDeleteBlog }) => {

  const [showDetails, setShowDetails] = useState(false)

  const toggleDetailsVisibility = () => {
    setShowDetails(!showDetails)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleDetailsVisibility}>{showDetails ? 'Hide' : 'View'}</button>
      </div>
      <div style={{ display: showDetails ? '' : 'None' }}>
        <div>{blog.url}</div>
        <div>
          Likes: {blog.likes}
          <button onClick={() => onLikeBlog(blog)}>Like</button>
        </div>
        <div>{user.name}</div>
        {user.name === blog.user.name &&<button onClick={() => onDeleteBlog(blog)}>Remove</button>}
      </div>
    </div>
  )
}

export default Blog