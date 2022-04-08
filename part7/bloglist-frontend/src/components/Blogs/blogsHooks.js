import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { likeBlog, insertComment } from '../../reducers/blogReducers'
import { fetchBlogs as loadBlogs, insertBlog } from '../../reducers/blogReducers'
import useAuth from '../hooks/useAuth'



export const useBlogs = () => {

  const dispatch = useDispatch()
  const { user } = useAuth()


  const blogs = useSelector(state => [...state.blogs].sort((a, b) => b.likes - a.likes))

  const addBlog = (title, author, url) => {
    dispatch(insertBlog(title, author, url, user))
  }

  const getBlogById = (blogId) => {
    return blogs.find(b => b.id === blogId)
  }

  useEffect(() => {
    dispatch(loadBlogs())
  }, [])

  return {
    blogs,
    addBlog,
    getBlogById
  }

}

export const useBlog = () => {

  const dispatch = useDispatch()
  const { id: blogId } = useParams()
  const { getBlogById } = useBlogs()
  const blog = getBlogById(blogId)

  const like = () => {
    dispatch(likeBlog(blog))
  }

  const comment = (text) => {
    if(text && text !== '')
      dispatch(insertComment(blogId, text))
  }

  return {
    blog,
    like,
    comment
  }

}

