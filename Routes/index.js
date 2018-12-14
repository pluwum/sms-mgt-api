'use strict'

const sms = require('./sms')
const contact = require('./contact')
const auth = require('./auth')
module.exports = router => {
  sms(router)
  contact(router)
  auth(router)
}
