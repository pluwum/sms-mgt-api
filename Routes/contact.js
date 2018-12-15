'use strict'

const Contact = require('../Models/Contact')
const Sms = require('../Models/Sms')
const _ = require('lodash')
const { verifyToken } = require('../utils/auth')
const { sendResponse } = require('../utils/misc')

module.exports = router => {
  const URL_PREFIX = '/contact'

  // Create Contact
  router.post(URL_PREFIX, (req, res) => {
    Contact.findOne(
      { phoneNumber: req.body.phoneNumber },
      (error, existingContact) => {
        if (error) {
          sendResponse(
            res,
            null,
            'Error while creating contact',
            false,
            500,
            error
          )
        }

        if (existingContact) {
          sendResponse(
            res,
            null,
            'Error while creating contact: Duplicate number',
            false,
            400
          )
        } else {
          var contact = new Contact(req.body)

          contact.save(error => {
            if (error) {
              sendResponse(
                res,
                null,
                'Error while creating contact',
                false,
                500,
                error
              )
            }

            sendResponse(res, null, 'Contact created successfully', true, 201)
          })
        }
      }
    )
  })

  // Get my contact details
  router.get(`${URL_PREFIX}`, verifyToken, (req, res) => {
    Contact.findById(req.decodedToken.contactId, (error, contact) => {
      if (error) {
        sendResponse(
          res,
          null,
          'Error while getting contact',
          false,
          500,
          error
        )
      }
      sendResponse(res, contact)
    })
  })

  // Update Contact
  router.put(`${URL_PREFIX}/:id`, verifyToken, (req, res) => {
    Contact.findById(req.decodedToken.contactId, (error, contact) => {
      if (error) {
        sendResponse(
          res,
          null,
          'Error while updating Contact',
          false,
          500,
          error
        )
      }
      if (contact) {
        _.merge(contact, req.body)
        contact.save(error => {
          if (error) {
            sendResponse(
              res,
              null,
              'Error while updating Contact',
              false,
              500,
              error
            )
          }

          sendResponse(res, contact, 'Contact updated successfully', true)
        })
      }
    })
  })

  router.delete(`${URL_PREFIX}/`, verifyToken, (req, res) => {
    const { contactId } = req.decodedToken

    Contact.findByIdAndRemove(contactId, (error, contact) => {
      if (error) {
        sendResponse(
          res,
          null,
          'Error while removing contact',
          false,
          500,
          error
        )
      }
      // TODO: probably best to use hook
      Sms.deleteMany({ sender: contactId }, error => {
        if (error) {
          sendResponse(
            res,
            null,
            'Error while removing contact',
            false,
            500,
            error
          )
        }
        Sms.updateMany(
          { receiver: contactId },
          {
            receiver: 'deleted_user'
          },
          error => {
            if (error) {
              sendResponse(
                res,
                null,
                'Error while removing contact',
                false,
                500,
                error
              )
            }

            sendResponse(res, contactId, 'Contact removed successfully', true)
          }
        )
      })
    })
  })
}
