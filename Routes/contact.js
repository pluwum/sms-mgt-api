'use strict'

const Contact = require('../Models/Contact')
const Sms = require('../Models/Sms')
const _ = require('lodash')

module.exports = router => {
  const URL_PREFIX = '/contact'

  // Create Contact
  router.post(URL_PREFIX, (req, res) => {
    var contact = new Contact(req.body)
    contact.save(error => {
      if (error) {
        res.json({ info: 'Error while creating contact', error: error })
      }
      res.json({ info: 'Contact created successfully' })
    })
  })

  // Get my contact details
  router.get(`${URL_PREFIX}/:id`, (req, res) => {
    Contact.findById(req.params.id, (error, contact) => {
      if (error) {
        res.json({ info: 'Error while geting sms', error: error })
      }
      res.json(contact)
    })
  })

  // Update Contact
  router.put(`${URL_PREFIX}/:id`, (req, res) => {
    Contact.findById(req.params.id, (error, contact) => {
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

  router.delete(`${URL_PREFIX}/:id`, function (req, res) {
    Contact.findByIdAndRemove(req.params.id, (error, contact) => {
      if (error) {
        res.json({ info: 'error while removing contact', error: error })
      }
      // TODO: probably best to use hook
      Sms.deleteMany({ sender: req.params.id }, error => {
        if (error) {
          res.json({ info: 'error while removing contact', error: error })
        }
        Sms.updateMany(
          { receiver: req.params.id },
          {
            receiver: 'deleted_user'
          },
          error => {
            if (error) {
              res.json({ info: 'error while removing contact', error: error })
            }
            res.json({
              info: 'contact removed successfully',
              body: req.params.id
            })
          }
        )
      })
    })
  })
}
