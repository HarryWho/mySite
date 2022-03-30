const express = require('express');
const router = express.Router();
const { RegisterFormValidations } = require('../../middleware/RegisterFormValidation')
router.get('/', (req, res) => {
  res.render('auth/login')
})

router.get('/register', (req, res) => {
  res.render('auth/register')
})
router.post('/', (req, res) => {

})

router.post('/register', (req, res) => {
  let errors = []
  console.log(req.body)
  RegisterFormValidations(req.body, (errors) => {
    if (errors.length > 0) res.render('auth/register', { errors: errors, field: req.body })
    console.log('Passed Validation')
  })
})



module.exports = router;