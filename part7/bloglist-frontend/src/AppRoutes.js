import React from 'react'
import { Routes, Route } from 'react-router-dom'
import User from './components/Users/User'
import UsersList from './components/Users/UsersList'
import BlogForm from './components/Blogs/BlogForm'
import BlogList from './components/Blogs/BlogList'
import Blog from './components/Blogs/Blog'

const AppRoutes = () => {

  return (
    <>
      <Routes>
        <Route path='/users/:id' element={<User />} />
        <Route path='users' element={<UsersList />} />
        <Route path='/blogs/:id' element={<Blog />} />
        <Route path='/' element={
          <>
            <BlogForm />
            <BlogList />
          </>
        } />
      </Routes>
    </>
  )

}
export default AppRoutes