const http = require('http')
const {MONGO_URI, PORT} = require('./config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRoutes = require('./controllers/blogRoutes')
const userRoutes = require('./controllers/userRoutes')
const loginRoute = require('./controllers/loginRouter')
const testingRoute = require('./controllers/testingRouter')
const {errorHandler} = require('./utils/middleware')

mongoose.connect(MONGO_URI)

app.use(cors())
app.use(express.json())

if(process.env.NODE_ENV === 'test'){
  app.use('/api/testing', testingRoute)
}
app.use('/api/login', loginRoute)
app.use('/api/blogs', blogRoutes)
app.use('/api/users', userRoutes)
app.use(errorHandler)

module.exports = app