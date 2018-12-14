'use strict'

const sms = require('./sms')
const contact = require('./contact')
module.exports = router => {
  sms(router)
  contact(router)
}
