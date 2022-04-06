import React from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { likeBlog, insertComment } from '../../reducers/blogReducers'

import { Typography, Button, Form, Input, List } from 'antd'
const { Title } = Typography

const Blog = () => {

  const dispatch = useDispatch()
  const { id: blogId } = useParams()
  const blog = useSelector(state => state.blogs.find(b => b.id === blogId))


  const onLikeBlog = (blog) => {
    dispatch(likeBlog(blog))
  }

  const handleSummit = (values) => {
    const { comment } = values
    if(comment && comment !== '')
      dispatch(insertComment(blogId, comment))
  }

  if(!blog)
    return null

  return (
    <>
      <Title level={3}>{blog.title} - {blog.author}</Title>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>
        {blog.likes} likes <Button data-testid='likeBtn' onClick={() => onLikeBlog(blog)}>Like</Button>
      </div>
      <div>
        added by {blog.user.name}
      </div>

      <Form layout='inline' onFinish={handleSummit} style={{ margin: '5px 0' }}>
        <Form.Item
          name="comment"
        >
          <Input placeholder='Comment here!'/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Add Comment</Button>
        </Form.Item>
      </Form>

      <List
        size='small'
        split
        bordered
        dataSource={blog.comments}
        renderItem={item => (
          <List.Item>
            {item}
          </List.Item>
        )}
      />
    </>
  )

}
export default Blog