const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  joined: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String,
    default: '/dist/img/avatar.png'
  },
  setting: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Setting'
  }
})
module.exports = mongoose.model('User', UserSchema)