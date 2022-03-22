const route = require('express').Router()
const Blog = require('../models/blogModel')
const User = require('../models/userModel')

route.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    blogs: false
  })
  
  response.json(blogs)
})

route.post('/', async (request, response, next) => {
  const user = await User.findOne({})
  const blog = new Blog({
    ...request.body,
    user: user.id
  })
  const result = await blog.save()
  user.blogs = user.blogs.concat(result.id)
  await user.save()
  response.status(201).json(result)
})

route.delete('/:id', async (request, response) => {
  const del = await Blog.findByIdAndDelete(request.params.id)
  if(del)
    response.status(204).json({message: 'OK'})
  response.status(404).end()
})

route.put('/:id', async (request, response) => {
  const blog = await Blog.findByIdAndUpdate(request.params.id, request.body)
  response.status(201).json(blog)
})

module.exports = route