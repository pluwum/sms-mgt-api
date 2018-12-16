'use strict'

const Sms = require('../Models/Sms')
const _ = require('lodash')
const { verifyToken } = require('../utils/auth')
const {
  sendResponse,
  sendValidationErrorResponse,
  validateInput
} = require('../utils/misc')

module.exports = router => {
  const URL_PREFIX = '/sms'

  // Get all Sms / Receive
  router.get(URL_PREFIX, verifyToken, (req, res) => {
    Sms.find({ receiver: req.decodedToken.contactId }, (error, sms) => {
      if (error) {
        return sendResponse(
          res,
          null,
          'Error while collecting sms',
          false,
          500,
          error
        )
      }

      sendResponse(res, sms, 'SMS collected succefully', true, 200)
    })
  })

  // Send sms
  router.post(URL_PREFIX, verifyToken, (req, res) => {
    const { receiver, message } = req.body
    var validation = validateInput({
      receiver: { value: receiver, required: true },
      message: { value: message, required: true, minLength: 1 }
    })

    if (!validation.passed) {
      return sendValidationErrorResponse(res, validation)
    }

    var sms = new Sms({ sender: req.decodedToken.contactId, ...req.body })
    sms.save(error => {
      if (error) {
        return sendResponse(
          res,
          null,
          'Error while sending sms',
          false,
          500,
          error
        )
      }

      sendResponse(res, sms, 'SMS sent successfully', true, 200)
    })
  })

  // Get sms by ID
  router.get(`${URL_PREFIX}/:id`, verifyToken, (req, res) => {
    Sms.findById(req.params.id, (error, sms) => {
      if (error) {
        return sendResponse(
          res,
          null,
          'Error while geting sms',
          false,
          500,
          error
        )
      }
      if (sms) {
        if (sms.receiver == req.decodedToken.contactId) {
          sendResponse(res, sms, 'SMS received successfully', true, 200)
        } else {
          sendResponse(
            res,
            null,
            'Error while geting sms',
            false,
            401,
            'You are not authorised to view this sms'
          )
        }
      } else {
        sendResponse(
          res,
          null,
          'Error while geting sms',
          false,
          404,
          'The sms with the provided id does not exist'
        )
      }
    })
  })

  // Update status sms
  router.put(`${URL_PREFIX}/:id`, verifyToken, (req, res) => {
    const { receiver, message } = req.body
    var validation = validateInput({
      receiver: { value: receiver },
      message: { value: message, minLength: 1 }
    })

    if (!validation.passed) {
      return sendValidationErrorResponse(res, validation)
    }

    Sms.findById(req.params.id, (error, sms) => {
      if (error) {
        return sendResponse(
          res,
          null,
          'Error while updating sms',
          false,
          500,
          error
        )
      }
      if (sms) {
        if (sms.receiver == req.decodedToken.contactId) {
          _.merge(sms, req.body)
          sms.save(error => {
            if (error) {
              return sendResponse(
                res,
                null,
                'Error while updating sms',
                false,
                500,
                error
              )
            }

            sendResponse(res, sms, 'Sms updated successfully.')
          })
        } else {
          sendResponse(
            res,
            null,
            'Error while updating sms',
            false,
            401,
            'You are not authorised to update this sms'
          )
        }
      }
    })
  })
}
