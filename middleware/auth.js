ensureUser = function(req, res, next) {

    if (req.isAuthenticated()) {
      next()
    } else {
      res.redirect('/auth')
    }
  },
  ensureGuest = function(req, res, next) {
    if (!req.isAuthenticated()) {
      next()
    } else {
      res.redirect('/dashboard')
    }
  }
module.exports = {
  ensureUser,
  ensureGuest
}