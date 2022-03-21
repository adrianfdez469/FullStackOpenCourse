const mongoose = require('mongoose')

const UserScheme = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    transform: (document, ret, options) => {
      const {password, ...restUserData} = ret
      return restUserData
    }
  }
})

const UserModel = mongoose.model('User', UserScheme);
module.exports = UserModel