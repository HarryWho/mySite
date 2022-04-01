const express = require('express')
const router = express.Router();
const Article = require('../../../models/ArticleModel')
router.get('/', (req, res) => {
  res.render('logedin/article/article_form', {
    user: req.user,
    action: '/article',
    caption: 'Save'
  })
})
router.get('/edit/:articleID', async(req, res) => {
  const article = await Article.findOne({ _id: req.params.articleID })
  console.log(article)
  res.render('logedin/article/article_form', {
    user: req.user,
    action: `/article/${article._id}?_method=PUT`,
    caption: 'Edit',
    article: article
  })
})

router.put('/:articleID', async(req, res) => {
  await Article.findByIdAndUpdate(req.params.articleID, req.body)
  res.redirect('/dashboard')

})

router.post('/', (req, res) => {
  const article = {
    title: req.body.title,
    article: req.body.article,
    status: req.body.status
  }
  try {
    const newarticle = new Article(article)
    newarticle.save()
    res.redirect('/dashboard')
  } catch (error) {
    console.log(error)
    res.render('logedin/article/article_form', { user: req.user, article: req.body });
  }
  res.redirect('/dashboard')
})
module.exports = router