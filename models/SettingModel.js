const mongoose = require('mongoose')

const SettingSchema = new mongoose.Schema({
  navbarbgcolor: {
    type: String,
    default: 'bg-dark'
  },
  navbarcolor: {
    type: String,
    default: 'navbar-dark'
  },
  sidebarcolor: {
    type: String,
    default: 'sb-sidenav-dark'
  }
})

module.exports = mongoose.model('Setting', SettingSchema)