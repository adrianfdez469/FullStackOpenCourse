import React from 'react'


import { Link } from 'react-router-dom'
import { Typography, Table } from 'antd'
import useUsers from './useUsers'

const { Title } = Typography

const UsersList = () => {

  const { users } = useUsers()

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

  return (
    <>
      <Title level={3}>Users</Title>
      <Table dataSource={users} columns={tableCols} rowKey='id' />
    </>
  )

}
export default UsersList