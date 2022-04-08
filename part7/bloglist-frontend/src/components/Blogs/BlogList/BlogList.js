import React from 'react'
import { List } from 'antd'
import BlogListItem from './BlogListItem'
import { useBlogs } from '../blogsHooks'


const BlogList = () => {

  const { blogs } = useBlogs()

  return (
    <List
      itemLayout='horizontal'
      dataSource={blogs}
      renderItem={blog => <BlogListItem blog={blog} />}
    />
  )
}
export default BlogList