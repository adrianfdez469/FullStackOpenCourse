import React, { useRef } from 'react'
import Togglable from '../../Utils/Togglable'
import { Form, Input, Button, Typography } from 'antd'
import { useBlogs } from '../blogsHooks'
const { Title } = Typography

const BlogForm = () => {

  const { addBlog } = useBlogs()
  const togglableRef = useRef()

  const onBlogSummit = (values) => {
    const { title, author, url } = values
    addBlog(title, author, url)
    togglableRef.current.toggleVisibility()
  }

  return (
    <Togglable buttonLabel={'New Note'} ref={togglableRef}>
      <Title level={3} >Create new blog</Title>
      <Form
        name="basic"
        onFinish={onBlogSummit}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please input the title!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Author"
          name="author"
          rules={[
            {
              required: true,
              message: 'Please input the author!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Url"
          name="url"
          rules={[
            {
              required: true,
              message: 'Please input the url!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </Togglable>
  )

}

export default BlogForm