import React, { useState } from 'react'

const BlogItem = ({ blog, user, onLikeBlog, onDeleteBlog }) => {

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
      <div id="blog-basic-data">
        {blog.title} {blog.author} <button onClick={toggleDetailsVisibility}>{showDetails ? 'Hide' : 'View'}</button>
      </div>
      <div id="blog-full-data" style={{ display: showDetails ? '' : 'None' }}>
        <div>{blog.url}</div>
        <div>
          Likes: {blog.likes}
          <button id='likeBtn' onClick={() => onLikeBlog(blog)}>Like</button>
        </div>
        <div>{user.name}</div>
        {user.name === blog.user.name &&<button onClick={() => onDeleteBlog(blog)}>Remove</button>}
      </div>
    </div>
  )
}

export default BlogItem