import React/*, { useState }*/ from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { likeBlog, deleteBlog } from '../../reducers/blogReducers'
import { Link } from 'react-router-dom'

const BlogItem = ({ blog }) => {

  //const dispatch = useDispatch()
  //const [showDetails, setShowDetails] = useState(false)
  //const user = useSelector(state => state.auth)
  /*const toggleDetailsVisibility = () => {
    setShowDetails(!showDetails)
  }*/

  /*const onLikeBlog = (blog) => {
    dispatch(likeBlog(blog))
  }*/

  /*const onDeleteBlog = (blog) => {
    if(window.confirm(`Remove blog ${blog.name} by ${blog.author}`)){
      dispatch(deleteBlog(blog.id, user))
    }
  }*/

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div data-testid="blog-item" style={blogStyle}>
      <div data-testid="blog-basic-data">
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
        {/*<button onClick={toggleDetailsVisibility}>{showDetails ? 'Hide' : 'View'}</button>*/}
      </div>
      {/*<div data-testid="blog-full-data" style={{ display: showDetails ? '' : 'None' }}>
        <div><b>Url: </b>{blog.url}</div>
        <div>
          <b>Likes: </b>{blog.likes}
          <button data-testid='likeBtn' onClick={() => onLikeBlog(blog)}>Like</button>
        </div>
        <div><b>Creator: </b>{user.name}</div>
        {user.id === blog.user.id &&<button onClick={() => onDeleteBlog(blog)}>Remove</button>}
      </div>*/}
    </div>
  )
}

export default BlogItem