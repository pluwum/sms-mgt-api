'use strict'

const Contact = require('../Models/Contact')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const URL_PREFIX = '/authenticate'

module.exports = router => {
  // Authenticate
  router.post(URL_PREFIX, (req, res, next) => {
    Contact.findOne({ phoneNumber: req.body.phoneNumber }, (error, contact) => {
      if (error) {
        res.json({ info: 'Error while Authenticating contact', error: error })
      }
      if (!contact) {
        res.json({
          info: 'Authentication failed: Contact does not exist failed'
        })
      }
      if (req.body.passCode !== contact.passCode) {
        res.json({ info: 'Authentication failed: PassCode mismatch' + token })
      } else {
        const { phoneNumber, _id: contactId } = contact
        const payload = {
          phoneNumber,
          contactId
        }
        // create a token that expires in 24 hours
        var token = jwt.sign(payload, process.env.SECRET, {
          expiresIn: 86400
        })
        // return the information including token
        res.json({
          info: 'Successfully authenticated',
          token: token
        })
      }
    })
  })
}
