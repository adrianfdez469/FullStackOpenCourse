const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../src/app')
const BlogModel = require('../src/models/blogModel');
const UserModel = require('../src/models/userModel');
const {blogs} = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await UserModel.deleteMany({})
  const user1 = {
    "name": "Yhon",
    "username": "qaz",
    "password": "1qazxsw2"
  };
  const user2 = {
    "name": "Max",
    "username": "max",
    "password": "12345678"
  }
  await UserModel.insertMany([user1, user2])
  await BlogModel.deleteMany({})
  await BlogModel.insertMany(blogs)
})

describe('Integration tests - Get blogs', () => {
  
  test('should get 200 http code and appication/json Content-Type', async () => {
    await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
  })

  test('should return all blogs', async () => { 
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(blogs.length)
   })
  
   test('id propertie should be defined for all blogs', async () => {
     const response = await api.get('/api/blogs')
     response.body.forEach(resp => {
       expect(resp.id).toBeDefined()
       expect(resp._id).not.toBeDefined()
     })
   })
})

describe('Integration tests - POST blog', () => {

  const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyM2IzNWQyMzk2MmI4NTQwODBiNDMxMCIsInVzZXJuYW1lIjoicWF6IiwiaWF0IjoxNjQ4MDQ3NTc0fQ.g5kEDWWVw7Ug60TSBKnFKSQJgB1hQMU6a8sIuBCE51M'
  const newBlog = {
    title: "How to be a Pirate",
    author: "Monkey D. Luffy",
    url: "http://blog.oneppeace.com/luffy/how_to_be_a_pirate",
    likes: 5,
  }

  test('should get a 201 http code and Content-Type application/json', async () => {
    await api.post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog).expect(201).expect('Content-Type', /application\/json/)
  })

  test('should be added to db', async () => {
    await api.post('/api/blogs').set('Authorization', token).send(newBlog)
    const blogsInDb = await BlogModel.find({})

    expect(blogsInDb).toHaveLength(blogs.length + 1)
    
  })
  test('should have been added to db', async () => {
    await api.post('/api/blogs').set('Authorization', token).send(newBlog)
    const blogsInDb = await BlogModel.find({})

    const titles = blogsInDb.map(b => b.title)
    expect(titles).toContain("How to be a Pirate")
  })
  test('should return the newly added blog with id', async () => {
    const response = await api.post('/api/blogs').set('Authorization', token).send(newBlog)
    expect(response.body).toMatchObject(newBlog)
    expect(response.body).toHaveProperty('id')
  })
  test('blog without likes should save likes = 0', async () => {
    const blog = {
      title: "How to be a Pirate",
      author: "Monkey D. Luffy",
      url: "http://blog.oneppeace.com/luffy/how_to_be_a_pirate",
    }
    const response = await api.post('/api/blogs').set('Authorization', token).send(blog)
    const blogsInDb = await BlogModel.find({})
    const savedBlog = blogsInDb.find(b => b.id === response.body.id)
    expect(savedBlog).toBeDefined()
    expect(savedBlog.likes).toBe(0)
  })

  test('should get a 400 http code if title is missing', async () => {
    const blog = {
      author: 'Chandler Bing',
      url: 'http://www.google.com'
    }
    const response = await api.post('/api/blogs').set('Authorization', token).send(blog).expect(400)

  })
  test('should get a 400 http code if url is missing', async () => {
    const blog = {
      author: 'Monica Geller',
      title: 'Cooking for you'
    }
    const response = await api.post('/api/blogs').set('Authorization', token).send(blog).expect(400)
  })

  test('should fail with 404 status code if token is not provided', async () => {
    const blog = {
      author: 'Monica Geller',
      title: 'Cooking for you'
    }
    await api.post('/api/blogs').send(blog).expect(401)
  })
})


describe('Integration tests - DELETE blog', () => {

  const tokenUser1 = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyM2IzNWQyMzk2MmI4NTQwODBiNDMxMCIsInVzZXJuYW1lIjoicWF6IiwiaWF0IjoxNjQ4MDQ5Njk1fQ.-Rhn2Of92OPxWiwwvlnZX_oLHRiVCOeUsEgUD5_F4EE';
  //const tokenUser2 = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyM2IzNjFhMzk2MmI4NTQwODBiNDMxOCIsInVzZXJuYW1lIjoibWF4IiwiaWF0IjoxNjQ4MDQ5NzI4fQ.xBcSEi2RcxWf3iMweQjeBKUMIaccxz4_2MYLg9AwemM'
  //const wrongToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyM2IzNjFhMzk2MmI4NTQwODBiNDMxOCIsInVzZXJuYW1lIjoibWF4IiwiaWF0IjoxNjQ4MDQ5NzI4fQ.xBcSEi2RcxWf3iMweQjeBKUMIaccxz4_2454sdas654'

  



  test('should send 404 if theres no param id', async () => {
    await api.delete(`/api/blogs`).set('Authorization', tokenUser1).expect(404)
  })

  test('should send 404 if id is not valid', async () => {
    await api.delete(`/api/blogs/12312`).set('Authorization', tokenUser1).expect(404)
  })

  test('should send 404 if id not found', async () => {
    const blogs = await BlogModel.find({})
    const id = blogs[0].id
    await BlogModel.findByIdAndDelete(id)
    await api.delete(`/api/blogs/${id}`).set('Authorization', tokenUser1).expect(404)
  })

  test('should send 204 if success', async () => {
    const blogs = await BlogModel.find({})
    const blog = blogs[0]
    await api.delete(`/api/blogs/${blog.id}`).set('Authorization', tokenUser1).expect(204)
  })

  test('should have -1 blog on db', async () => {
    const blogs = await BlogModel.find({})
    const id = blogs[0].id
    await api.delete(`/api/blogs/${id}`).set('Authorization', tokenUser1).expect(204)
    const newblogs = await BlogModel.find({})
    expect(newblogs).toHaveLength(blogs.length-1)
  })

  test('should remove from db if success', async () => {
    const blogs = await BlogModel.find({})
    const id = blogs[0].id
    await api.delete(`/api/blogs/${id}`).set('Authorization', tokenUser1).expect(204)
    const newblogs = await BlogModel.find({})
    expect(newblogs).toHaveLength(blogs.length-1)
    expect(newblogs).not.toEqual(blogs)
  })

})



afterAll(() => {
  mongoose.connection.close()
})