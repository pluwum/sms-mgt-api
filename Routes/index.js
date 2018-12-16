'use strict'

const sms = require('./sms')
const contact = require('./contact')
const auth = require('./auth')

module.exports.routes = router => {
  sms(router)
  contact(router)
  auth(router)
}

module.exports.handle404 = () => {
  // Handle 404s
  return function (req, res, next) {
    return res.status(404).send({ message: 'Route' + req.url + ' Not found.' })
  }
}

module.exports.handle500 = () => {
  // handle exceptions
  return function (err, req, res, next) {
    // return res.status(500).send({ error: err })
  }
}
