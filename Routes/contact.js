'use strict'

const Contact = require('../Models/Contact')
const Sms = require('../Models/Sms')
const _ = require('lodash')
const authUtils = require('../utils/auth')

module.exports = router => {
  const URL_PREFIX = '/contact'
  const { verifyToken } = authUtils

  // Create Contact
  router.post(URL_PREFIX, (req, res) => {
    Contact.findOne(
      { phoneNumber: req.body.phoneNumber },
      (error, existingContact) => {
        if (error) {
          res.json({ info: 'Error while creating contact', error: error })
        }

        if (existingContact) {
          res.status(400).json({
            info: 'Error while creating contact',
            error: 'Duplicate number'
          })
        } else {
          var contact = new Contact(req.body)

          contact.save(error => {
            if (error) {
              res.json({ info: 'Error while creating contact', error: error })
            }
            res.json({ info: 'Contact created successfully' })
          })
        }
      }
    )
  })

  // Get my contact details
  router.get(`${URL_PREFIX}`, verifyToken, (req, res) => {
    Contact.findById(req.decodedToken.contactId, (error, contact) => {
      if (error) {
        res.json({ info: 'Error while geting sms', error: error })
      }
      res.json(contact)
    })
  })

  // Update Contact
  router.put(`${URL_PREFIX}/:id`, verifyToken, (req, res) => {
    Contact.findById(req.decodedToken.contactId, (error, contact) => {
      if (error) {
        res.json({ info: 'Error while updating Contact', error: error })
      }
      if (contact) {
        _.merge(contact, req.body)
        contact.save(error => {
          if (error) {
            res.json({ info: 'Error while updating Contact', error: error })
          }
          res.json({ info: 'Contact updated successfully.', body: contact })
        })
      }
    })
  })

  router.delete(`${URL_PREFIX}/`, verifyToken, (req, res) => {
    const { contactId } = req.decodedToken

    Contact.findByIdAndRemove(contactId, (error, contact) => {
      if (error) {
        res.json({ info: 'error while removing contact', error: error })
      }
      // TODO: probably best to use hook
      Sms.deleteMany({ sender: contactId }, error => {
        if (error) {
          res.json({ info: 'error while removing contact', error: error })
        }
        Sms.updateMany(
          { receiver: contactId },
          {
            receiver: 'deleted_user'
          },
          error => {
            if (error) {
              res.json({ info: 'error while removing contact', error: error })
            }
            res.json({
              info: 'contact removed successfully',
              body: contactId
            })
          }
        )
      })
    })
  })
}
