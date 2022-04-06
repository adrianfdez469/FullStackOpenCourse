import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { insertBlog } from '../../reducers/blogReducers'
import Togglable from '../Utils/Togglable'

import { Form, Input, Button, Typography } from 'antd'
const { Title } = Typography

const BlogForm = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.auth)
  const togglableRef = useRef()

  const onBlogSummit = (values) => {
    const { title, author, url } = values
    dispatch(insertBlog(title, author, url, user))
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