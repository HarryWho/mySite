const express = require('express');
const Articles = require('../../models/ArticleModel')
const router = express.Router();

router.get('/', async(req, res) => {
  const articles = await Articles.find();

  res.render('logedin/dashboard', { user: req.user, articles: articles })
})


module.exports = router;