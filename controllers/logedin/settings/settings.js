const express = require('express');

const router = express.Router();
const Setting = require('../../../models/SettingModel')

router.get('/', (req, res) => {
  res.render('logedin/settings/settings', { user: req.user })
})


router.post('/', async(req, res) => {
  console.log(req.body)
  const settings = {
    navbarbgcolor: req.body.navbarbgcolor,
    navbarcolor: req.body.navbarcolor,
    sidebarcolor: req.body.sidebarcolor
  }
  try {
    await Setting.findByIdAndUpdate(req.user.settings._id, settings);
    req.user.settings = settings
    req.session.save(function(err) {
      req.session.reload(function(err) {

      });
    });
    res.send('Settings Saved...')
  } catch (err) {
    console.log(err)
  }

})
module.exports = router