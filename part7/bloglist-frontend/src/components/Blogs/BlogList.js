import React from 'react'
import { useSelector } from 'react-redux'
import { List } from 'antd'
import BlogItem from './BlogItem'



const BlogList = () => {

  const blogs = useSelector(state => [...state.blogs].sort((a, b) => b.likes - a.likes))

  /*return blogs.map(blog =>
    <BlogItem key={blog.id} blog={blog}/>
  )*/
  return (
    <List
      itemLayout='horizontal'
      dataSource={blogs}
      renderItem={blog => <BlogItem blog={blog} />}
    />
  )
}
export default BlogList