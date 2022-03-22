const {Schema, model, Types} = require('mongoose')

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
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  toJSON: {
    transform: (document, ret, options) => {
      const  {_id, __v, ...obj} = ret
      return {
        ...obj,
        id: _id
      }
    }
  }
})

const Blog = model('Blog', blogSchema)

module.exports = Blog