const mongoose = require('mongoose')
const { startServer } = require('./apollo/server')
const { MONGDB_URI } = require('./globals')

mongoose.connect(MONGDB_URI)
  .then(() => {
    console.log('Connected to DB')
  })
  .catch(err => {
    console.log('Error conection to MongoDB', err.message)
  })


  startServer()