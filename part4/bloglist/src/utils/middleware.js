const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')

const errorHandler = (error, req, resp, next) => {
  if(error.name === 'ValidationError'){
    resp.status(400).json({message: error.message})
  }else if(error.name === 'CastError'){
    resp.status(404).json({message: error.message})
  }else if(error.name === 'JsonWebTokenError'){
    resp.status(403).json({message: 'Invalid token'})
  }else if(error.name === 'TokenExpiredError'){
    resp.status(403).json({message: 'Expired token'})
  }
  next(error)
}

const tokenExtractor = (request, response, next) => {
  if(!request.headers.authorization){
    return response.status(401).json({message: 'Not authenticated'})
  }
  const tokenBearer = request.headers.authorization
  const token = tokenBearer.substring(7)
  request.token = token;
  next();
}

const userExtractor = (request, response, next) => {
  if(!request.headers.authorization){
    return response.status(401).json({message: 'Not authenticated'})
  }
  const tokenBearer = request.headers.authorization
  const token = tokenBearer.substring(7)
  request.user = jwt.verify(token, JWT_SECRET)
  next();
}

/*const isAuth = (request, response, next) => {
  if(!request.headers.authorization){
    return response.status(403).json({message: 'Not authenticated'})
  }
  const tokenBearer = request.headers.authorization
  const token = tokenBearer.substring(7)
  request.user = jwt.verify(token, JWT_SECRET)
  next();
}*/


module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor
}

