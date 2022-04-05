import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { insertBlog } from '../../reducers/blogReducers'
import Togglable from '../Utils/Togglable'

const BlogForm = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.auth)
  const togglableRef = useRef()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onBlogSummit = (event) => {
    event.preventDefault()
    dispatch(insertBlog(title, author, url, user))
    togglableRef.current.toggleVisibility()
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Togglable buttonLabel={'New Note'} ref={togglableRef}>
      <h1>Create new blog</h1>
      <form onSubmit={(event) => onBlogSummit(event)}>

        <div>Title:<input data-testid='title' value={title} onChange={({ target }) => setTitle(target.value)}/></div>
        <div>Author:<input data-testid='author' value={author} onChange={({ target }) => setAuthor(target.value)}/></div>
        <div>Url:<input data-testid='url' value={url} onChange={({ target }) => setUrl(target.value)}/></div>

        <div><button type='submit'>Create</button></div>
      </form>
    </Togglable>
  )

}

export default BlogForm