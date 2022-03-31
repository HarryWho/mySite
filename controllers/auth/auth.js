const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportLocal = require('../../config/passportLocal')
const { RegisterFormValidations, SaveUser } = require('../../middleware/RegisterFormValidation')
const { ensureGuest, ensureUser } = require('../../middleware/auth')

router.get('/', ensureGuest, (req, res) => {
  res.render('auth/login')
})

router.get('/register', ensureGuest, (req, res) => {
  res.render('auth/register')
})

router.post('/',
  passport.authenticate('local', { failureRedirect: '/auth' }),
  function(req, res) {
    res.redirect('/dashboard');
  });


router.post('/register', ensureGuest, (req, res) => {
  let errors = []
  console.log(req.body)

  RegisterFormValidations(req.body, (errors) => {
    if (errors.length > 0) res.render('auth/register', { errors: errors, field: req.body })
    SaveUser(req.body, (user) => {
      res.redirect('/auth')
    })
  })
})



module.exports = router;