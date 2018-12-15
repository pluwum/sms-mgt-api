'use strict'

const Contact = require('../Models/Contact')
const jwt = require('jsonwebtoken')
const { sendResponse } = require('../utils/misc')

require('dotenv').config()

const URL_PREFIX = '/authenticate'

module.exports = router => {
  // Authenticate
  router.post(URL_PREFIX, (req, res, next) => {
    Contact.findOne({ phoneNumber: req.body.phoneNumber }, (error, contact) => {
      if (error) {
        sendResponse(
          res,
          null,
          'Error while Authenticating contact',
          false,
          500,
          error
        )
      }
      if (!contact) {
        sendResponse(
          res,
          null,
          'Authentication failed: Contact does not exist failed',
          false,
          404
        )
      }
      if (req.body.passCode !== contact.passCode) {
        sendResponse(
          res,
          null,
          'Authentication failed: PassCode mismatch',
          false,
          400
        )
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
        sendResponse(res, token, 'Successfully authenticated', true, 200)
      }
    })
  })
}
