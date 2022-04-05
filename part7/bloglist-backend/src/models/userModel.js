const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const UserScheme = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }]
}, {
  toJSON: {
    transform: (document, ret, options) => {
      const {_id, __v, password, ...restUserData} = ret
      return {
        ...restUserData,
        id: _id
      }
    }
  }
})

UserScheme.plugin(uniqueValidator)

const UserModel = mongoose.model('User', UserScheme);
module.exports = UserModel