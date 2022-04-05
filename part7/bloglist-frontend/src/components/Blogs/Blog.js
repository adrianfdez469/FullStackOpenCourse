import React, { useRef } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { likeBlog, insertComment } from '../../reducers/blogReducers'

const Blog = () => {

  const dispatch = useDispatch()
  const { id: blogId } = useParams()
  const blog = useSelector(state => state.blogs.find(b => b.id === blogId))
  const inputRef = useRef()

  const onLikeBlog = (blog) => {
    dispatch(likeBlog(blog))
  }

  const handleSummit = (event) => {
    event.preventDefault()
    dispatch(insertComment(blogId, event.target.commnetInput.value))
    event.target.commnetInput.value = ''
  }

  if(!blog)
    return null

  return (
    <>
      <h1>{blog.title}{blog.author}</h1>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>
        {blog.likes} likes <button data-testid='likeBtn' onClick={() => onLikeBlog(blog)}>Like</button>
      </div>
      <div>
        added by {blog.user.name}
      </div>
      <form onSubmit={handleSummit}>
        <input ref={inputRef} name='commnetInput'  placeholder='Comment here!'/>
        <button type='submit'>Add comment</button>
      </form>
      <ul>
        {blog.comments.map((c, idx) => (<li key={idx}>{c}</li>))}
      </ul>
    </>
  )

}
export default Blog