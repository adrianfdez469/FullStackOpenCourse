const router = require('express').Router()
const BlogModel = require('../models/blogModel')
const UserModel = require('../models/userModel')

router.post('/reset', async (_request, response) => {
  
  await Promise.all([BlogModel.deleteMany({}), UserModel.deleteMany({})])
  response.status(204).json({message: 'OK'})
  
})

module.exports = router
