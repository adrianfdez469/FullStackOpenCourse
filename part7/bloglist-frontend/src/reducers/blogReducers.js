import { createSlice } from '@reduxjs/toolkit'
import serviceBlog from '../services/blogs'
import { setNotification } from './notificationReducers'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action){
      if(action.payload.length > 0){
        return [...action.payload]
      }
      return state
    },
    addBlog(state, action){
      return [...state, { ...action.payload.blog, user: action.payload.user }]
    },
    like(state, action){
      const { id } = action.payload
      return state.map(blg => blg.id !== id ? blg : { ...blg, likes: action.payload.likes } )
    },
    removeBlog(state, action){
      const id  = action.payload
      return state.filter(blg => blg.id !== id)
    },
    addComment(state, action){
      const { id, comment } = action.payload
      return state.map(blog => blog.id !== id ? blog : { ...blog, comments: [ comment,  ...blog.comments ] })
    }
  }
})

export const { setBlogs, addBlog, like, removeBlog, addComment } = blogSlice.actions

export const insertBlog = (title, author, url, user) => {
  return async dispatch => {
    const blog = await serviceBlog.createBlog({ title, author, url }, user.token)
    dispatch(addBlog({ blog, user }))
    dispatch(setNotification({ message: `Blog "${title}" by "${author}" added.` }))
  }
}

export const loadBlogs = () => {
  return async dispatch => {
    const blogs = await serviceBlog.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const likeBlog = ( blog ) => {
  return async dispatch => {
    const payload = {
      likes: blog.likes + 1
    }
    const updatedblog = await serviceBlog.modifyBLog(blog.id, payload)
    dispatch(like({ id: blog.id, likes: updatedblog.likes + 1 }))
    dispatch(setNotification({ message: `Blog "${updatedblog.title}" liked!` }))
  }
}

export const deleteBlog = (id, user) => {
  return async dispatch => {
    try{
      await serviceBlog.deleteBlog(id, user.token)
      dispatch(removeBlog(id))
    } catch(err){
      if(err.response.status === 403){
        dispatch(setNotification({ messsage: 'Only the owner of the blog can delete it!', error: true }))
      }else{
        dispatch(setNotification({ messsage: 'Error', error: true }))
      }
    }
  }
}

export const insertComment = (id, comment) => {
  return async dispatch => {
    await serviceBlog.commentBlog(id, comment)
    dispatch(addComment({ id, comment }))
  }
}

export default blogSlice.reducer