const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
  email: {
    type: String, unique: true
   },
  password: String
})

UserSchema.pre('save', function (next) {
  var user = this
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err)
      }
      bcrypt.hash(user.password, salt, null, function (err, hash) {
        if (err) {
          return next(err)
        }
        user.password = hash
        next()
      })
    })
  } else {
    return next()
  }
})

UserSchema.methods.comparePassword = function (password) {
  console.log(password, this.password)
  return bcrypt.compareSync(password, this.password)
}

var User = mongoose.model('User', UserSchema)
module.exports = User
