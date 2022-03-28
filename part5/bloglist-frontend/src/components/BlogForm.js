import React, { useState } from 'react'
import Togglable from './Togglable'

const BlogForm = ({ addBlog, togglableRef }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onBlogSummit = (event) => {
    event.preventDefault()

    addBlog(title, author, url)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Togglable buttonLabel={'New Note'} ref={togglableRef}>
      <h1>Create new blog</h1>
      <form onSubmit={(event) => onBlogSummit(event)}>
        <div>Title:<input name='title' value={title} onChange={({ target }) => setTitle(target.value)}/></div>
        <div>Author:<input name='author' value={author} onChange={({ target }) => setAuthor(target.value)}/></div>
        <div>Url:<input name='url' value={url} onChange={({ target }) => setUrl(target.value)}/></div>
        <div><button type='submit'>Create</button></div>
      </form>
    </Togglable>
  )

}
export default BlogForm