import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { Button, Typography } from 'antd'
import CustomNotification from '../Utils/Notification'
import useAuth from '../hooks/useAuth'

const { Header, Content, Footer } = Layout
const { Text, Title } = Typography

const LoginSection = () => {

  const { logout, user } = useAuth()

  return (
    <div style={{ margin: '5px 0', justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
      <Text strong type="success">{user.name} logged in!</Text>
      <Button onClick={logout}>Logout</Button>
    </div>
  )
}


const AppLayout = (props) => {

  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key={1}><Link to='/'>Blogs</Link></Menu.Item>
          <Menu.Item key={2}><Link to='/users'>Users</Link></Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <LoginSection />
        <Title level={2}>Blog App</Title>
        <CustomNotification />
        {props.children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>FullStackOpen Exercises By Adrian Fernandez</Footer>
    </Layout>
  )
}

export default AppLayout