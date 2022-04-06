import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import AppRoutes from '../../AppRoutes'
import { loadBlogs } from '../../reducers/blogReducers'
import { logout } from '../../reducers/authReducers'
import { Link } from 'react-router-dom'
import CustomNotification from '../Utils/Notification'


import { Layout, Menu, Button, Typography } from 'antd'
const { Header, Content, Footer } = Layout
const { Text, Title } = Typography

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
        {props.children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>FullStackOpen Exercises By Adrian Fernandez</Footer>
    </Layout>
  )
}


const Blogs = ({ user }) => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadBlogs())
  }, [])

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      <AppLayout>
        <div style={{ margin: '5px 0', justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
          <Text strong type="success">{user.name} logged in!</Text>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
        <CustomNotification />
        <Title level={2}>Blog App</Title>
        <AppRoutes />
      </AppLayout>
    </div>
  )
}

Blogs.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired
}

export default Blogs