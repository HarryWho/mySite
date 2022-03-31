const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router();

router.get('/', (req, res) => {
  console.log(req.user)
  res.render('logedin/dashboard', { user: req.user })
})


module.exports = router;