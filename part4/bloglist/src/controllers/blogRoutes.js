const route = require('express').Router()
const Blog = require('../models/blogModel')

route.get('/', async (request, response) => {
  
  const blogs = Blog.find({})
  response.json(blogs)
    
})

route.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  const result = await blog.save()
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