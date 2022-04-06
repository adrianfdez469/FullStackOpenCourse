import React, { useEffect } from 'react'
import { useSelector, useDispatch }   from 'react-redux'
import { loadAll } from '../../reducers/usersReducer'
import { Link } from 'react-router-dom'
import { Typography, Table } from 'antd'

const { Title } = Typography

const UsersList = () => {

  const dispatch = useDispatch()
  const users = useSelector(state => state.users.map(user => ({ ...user, cant: user.blogs.length })) )

  const tableCols = [{
    title: 'User',
    dataIndex: 'name',
    key: 'name',
    // eslint-disable-next-line react/display-name
    render: (text, record) => (<Link to={record.id} >{text}</Link>)
  },
  {
    title: 'Blogs created',
    key: 'cant',
    dataIndex: 'cant'
  }
  ]

  useEffect(() => {
    dispatch(loadAll())
  }, [])

  return (
    <>
      <Title level={3}>Users</Title>
      <Table dataSource={users} columns={tableCols} rowKey='id' />
    </>
  )

}
export default UsersList