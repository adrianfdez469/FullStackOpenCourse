const {Schema, model} = require('mongoose')

const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  }
}, {
  toJSON: {
    transform: (document, ret, options) => {
      const  {_id, ...obj} = ret
      return {
        ...obj,
        id: _id
      }
    }
  }
})

const Blog = model('Blog', blogSchema)

module.exports = Blog