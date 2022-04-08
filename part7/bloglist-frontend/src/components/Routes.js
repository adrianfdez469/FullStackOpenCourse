import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AppLayout from './Layout/Layout'
import User from './Users/User'
import Users from './Users/Users'
import BlogForm from './Blogs/BlogForm/BlogForm'
import BlogList from './Blogs/BlogList/BlogList'
import Blog from './Blogs/BlogIView/Blog'

const AppRoutes = () => {

  return (
    <AppLayout>
      <Routes>
        <Route path='/users/:id' element={<User />} />
        <Route path='users' element={<Users />} />
        <Route path='/blogs/:id' element={<Blog />} />
        <Route path='/' element={
          <>
            <BlogForm />
            <BlogList />
          </>
        } />
      </Routes>
    </AppLayout>
  )

}
export default AppRoutes