import React, {useState, useRef} from 'react';
import Togglable from './Togglable';
import blogService from '../services/blogs'

const BlogForm = ({addBlog, user, setNotification}) => {

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const togglableRef = useRef()

  const onBlogSummit = (event) => {
    event.preventDefault()
    blogService.createBlog({
      title, author, url
    }, user.token)
    .then(data => {
      addBlog(data)
      setTitle('')
      setAuthor('')
      setUrl('')
      setNotification({
        message: `Blog "${data.title}" by "${data.author}" added.`,
        error: false
      })
      togglableRef.current.toggleVisibility()
    })
    .catch(err => {
      console.log(err)
      setNotification({
        message: 'Error!',
        error: true
      })
    })
    
  }

  return (
    <Togglable buttonLabel={'New Note'} ref={togglableRef}>
      <h1>Create new blog</h1>
      <form onSubmit={(event) => onBlogSummit(event)}>
        <div>Title:<input value={title} onChange={({target}) => setTitle(target.value)}/></div>
        <div>Author:<input value={author} onChange={({target}) => setAuthor(target.value)}/></div>
        <div>Url:<input value={url} onChange={({target}) => setUrl(target.value)}/></div>
        <div><button type='submit'>Create</button></div>
      </form>
    </Togglable>
  );

}
export default BlogForm;