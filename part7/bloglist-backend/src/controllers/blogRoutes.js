const route = require('express').Router()
const Blog = require('../models/blogModel')
const UserModel = require('../models/userModel')
const { userExtractor } = require('../utils/middleware')

route.get('/', async (request, response) => {
  
  const blogs = await Blog.find({}).populate('user', {
    blogs: false
  })
  response.json(blogs)
})


route.post('/', userExtractor, async (request, response) => {
  const userData = request.user
  
  const blog = new Blog({
    ...request.body,
    user: userData.id
  })
  const persistedBlog = await blog.save()

  await UserModel.updateOne(
    { _id: userData.id},
    { $push: {blogs: persistedBlog.id}}
  )

  response.status(201).json(persistedBlog)
})

route.delete('/:id', userExtractor, async (request, response) => {
  const userData = request.user
  const blogToDelete = await Blog.findById(request.params.id)
  if(!blogToDelete){
    response.status(404).end()
  }
  if(blogToDelete.user && blogToDelete.user.toString() !== userData.id.toString()){
    return response.status(403).json({message: 'Only the owner of the blog can deleted!'})
  }
  
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).json({message: 'OK'})
  
})

route.put('/:id', async (request, response) => {
  const blog = await Blog.findByIdAndUpdate(request.params.id, request.body)
  response.status(201).json(blog)
})

route.patch('/:id', async (request, response) => {
  const blog = await Blog.findByIdAndUpdate(request.params.id, request.body)
  response.status(201).json(blog)
})

route.get('/:id/comments', async (request, response) => {
  const { id } = request.params
  const blog = await Blog.findById(id)
  if(!blog)
    return response.status(404).json({message: 'Not found!'})
  
    response.status(200).json(blog.comments)
})

route.post('/:id/comments', async (request, response) => {
  const { id } = request.params
  const { comment } = request.body
  const blog = await Blog.findById(id)
  if(!blog)
    return response.status(404).json({message: 'Not found!'})
  
  blog.comments.push(comment)
  const newBlog = await blog.save()
  
  response.status(201).json(newBlog)

})

module.exports = route