'use strict'

const Sms = require('../Models/Sms')
const _ = require('lodash')

module.exports = router => {
  const URL_PREFIX = '/sms'

  // Get all Sms
  router.get(URL_PREFIX, (req, res) => {
    Sms.find((error, sms) => {
      if (error) {
        res.json({ info: 'Error while collecting sms', error: error })
      }
      res.json(sms)
    })
  })

  // Send sms
  router.post(URL_PREFIX, (req, res) => {
    var sms = new Sms(req.body)
    sms.save(error => {
      if (error) {
        res.json({ info: 'Error while sending sms', error: error })
      }
      res.json({ info: 'SMS sent successfully' })
    })
  })

  // Get sms by ID
  router.get(`${URL_PREFIX}/:id`, (req, res) => {
    Sms.findById(req.params.id, (error, sms) => {
      if (error) {
        res.json({ info: 'Error while geting sms', error: error })
      }
      res.json(sms)
    })
  })

  // Update sms
  router.put(`${URL_PREFIX}/:id`, (req, res) => {
    Sms.findById(req.params.id, (error, sms) => {
      if (error) {
        res.json({ info: 'Error while updating sms', error: error })
      }
      if (sms) {
        _.merge(sms, req.body)
        sms.save(error => {
          if (error) {
            res.json({ info: 'Error while updating sms', error: error })
          }
          res.json({ info: 'Sms updated successfully.', body: sms })
        })
      }
    })
  })
}
