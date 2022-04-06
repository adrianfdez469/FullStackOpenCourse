import React from 'react'
import { Link } from 'react-router-dom'
import { List } from 'antd'

const BlogItem = ({ blog }) => {

  return (
    <List.Item>
      <List.Item.Meta
        title={<Link to={`/blogs/${blog.id}`} >{blog.title}</Link>}
        description={blog.author}
      />
    </List.Item>
  )
}

export default BlogItem