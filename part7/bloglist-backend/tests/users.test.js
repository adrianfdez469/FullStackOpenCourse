const mongoose = require('mongoose')
const app = require('../src/app')
const supertest = require('supertest')
const UserModel = require('../src/models/userModel')


const api = supertest(app)

beforeEach(async () => {
  await UserModel.deleteMany({})
})

describe('Integration test - User Create', () => {
  test('user password must be at least 3 characters long', async () => {
    const user = {
      name: 'Jhon',
      username: 'jhon',
      password: '12'
    }
    await api.post('/api/users').send(user).expect(400)
    const users = await UserModel.find({})
    expect(users).toHaveLength(0)
  })
  test('username must be at least 3 characters long', async () => {
    const user = {
      name: 'Jhon',
      username: 'jh',
      password: '123'
    }
    await api.post('/api/users').send(user).expect(400)
    const users = await UserModel.find({})
    expect(users).toHaveLength(0)
  })
  test('should create a user', async () => {
    const user = {
      name: 'Jhon',
      username: 'jho',
      password: '123'
    }
    const response = await api.post('/api/users').send(user).expect(201).expect('Content-Type', /application\/json/)
    delete user.password
    expect(response.body).toMatchObject(user)
    const usersInDb = await UserModel.find({})
    expect(usersInDb[0]).toMatchObject(user)
    expect(usersInDb).toHaveLength(1)
  })
  test('username must be unique', async () => {
    const userData1 = {
      name: 'Jhon',
      username: 'jho',
      password: '123'
    }
    const user1 = new UserModel(userData1)
    await user1.save()

    const userData2 = {
      name: 'Phil',
      username: 'jho',
      password: '321'
    }
    await api.post('/api/users').send(userData2).expect(400)
    const users = await UserModel.find({})
    expect(users).toHaveLength(1)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})