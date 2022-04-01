const moment = require('moment')
module.exports = {
  dateFormat: function(date, format) {
    return moment(date).format(format)
  }
}