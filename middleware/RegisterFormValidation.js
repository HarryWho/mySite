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
  }
}