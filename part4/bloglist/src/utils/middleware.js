
const errorHandler = (error, req, resp, next) => {
  if(error.name === 'ValidationError'){
    resp.status(400).json({error: error.message})
  }else if(error.name === 'CastError'){
    resp.status(404).json({error: error.message})
  }
  next(error)
}

module.exports = {
  errorHandler
}

