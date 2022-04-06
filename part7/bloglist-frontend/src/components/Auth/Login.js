import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../reducers/authReducers'

import { Form, Input, Button } from 'antd'
import CustomNotification from '../Utils/Notification'

const LoginUI = ({ onLogin }) => {
  return (
    <>
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
    </>
  )
}

const Login = () => {

  const dispatch = useDispatch()

  const onLogin = (values) => {
    const { username, password } = values
    dispatch(login(username, password))
  }

  return <LoginUI onLogin={onLogin} />
}

export default Login