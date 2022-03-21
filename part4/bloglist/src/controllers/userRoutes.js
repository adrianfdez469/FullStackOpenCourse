const route = require('express').Router()
const bcrypt = require('bcrypt')
const UserModel = require('../models/userModel')

route.get('/',async (req, resp) => {
  const users = await UserModel.find({})
  resp.status(200).json(users)
})

route.post('/', async (req, resp) => {
  const {username, password, name} = req.body
  

  if(!name){
    return resp.status(400).json({message: "Provide a name"})
  }

  if(!username){
    return resp.status(400).json({message: "Provide a username"})
  }
  
  if(!password || 
    // Minimum eight characters, at least one letter and one number: (RegExp from stackoverflow)
    !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(req.body.password) 
    ){
      return resp.status(400).json({message: "Password need to have eight characters minimum, at least one letter and one number"})
  }

  const hashedPass = await bcrypt.hash(password, 10)
  const newUser = new UserModel({
    name, username, password: hashedPass
  })
  const user = await newUser.save()
  resp.status(201).json(user)
})

module.exports = route