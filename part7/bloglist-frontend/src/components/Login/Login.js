import React from 'react'

import { Form, Input, Button } from 'antd'
import CustomNotification from '../Utils/Notification'
import useAuth from '../hooks/useAuth'

const Login = () => {

  const { onLogin } = useAuth()

  const centered = {
    margin: '20%',
    padding: '2em'
  }

  const colored = {
    backgroundColor: '#ddd'
  }

  return (
    <div style={{ ...centered, ...colored }}>
      <CustomNotification />
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onLogin}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login