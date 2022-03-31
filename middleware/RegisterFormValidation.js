const User = require('../models/UserModel')
const Setting = require('../models/SettingModel')
const bcrypt = require('bcryptjs')
module.exports = {
  RegisterFormValidations: function(body, done) {
    let errors = []
    if (!body.displayName || !body.email || !body.password || !body.password2) {
      errors.push({ msg: "All Fields are required" })
    }
    if (body.password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' })
    }
    if (body.password != body.password2) {
      errors.push({ msg: "Passwords do not match" })
    }
    done(errors)
  },
  SaveUser: async function(body, done) {
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(body.password, salt)
    const settings = await new Setting().save()
    const newUser = {
      displayName: body.displayName,
      email: body.email,
      password: hash.toString(),
      setting: settings
    }
    try {
      const user = await new User(newUser)
      user.save()
      return done(user)
    } catch (err) {
      console.log(err)
      res.redirect('/auth/register')
    }

  },
  AuthUser: async function(user, password, next) {
    if (await bcrypt.compare(password, user.password)) {
      next(true)
    } else {
      next(false)
    }
  }
}