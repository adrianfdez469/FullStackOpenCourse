const route = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UserModel = require('../models/userModel')
const User = require('../models/userModel')
const {JWT_SECRET} = require('../config')


route.post('/', async (request, response) => {
  const {username, password} = request.body
  const user = await UserModel.findOne({username})
  if(!user){
    return response.status(401).json({message: 'Wrong username/password!'})
  }
  const hashPass = user.password
  const passOk = await bcrypt.compare(password, hashPass)
  if(!passOk){
    return response.status(401).json({message: 'Wrong username/password!'})
  }
  
  const token = jwt.sign({
    id: user._id,
    username: user.username
  }, JWT_SECRET)

  response.status(200).send({
    token, username: user.username, name: user.name, id: user._id
  })


})

module.exports = route