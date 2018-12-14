'use strict'

const Sms = require('../Models/Sms')
const _ = require('lodash')
const authUtils = require('../utils/auth')

module.exports = router => {
  const URL_PREFIX = '/sms'
  const { verifyToken } = authUtils

  // Get all Sms / Receive
  router.get(URL_PREFIX, verifyToken, (req, res) => {
    Sms.find({ receiver: req.decodedToken.contactId }, (error, sms) => {
      if (error) {
        res.json({ info: 'Error while collecting sms', error: error })
      }
      res.json(sms)
    })
  })

  // Send sms
  router.post(URL_PREFIX, verifyToken, (req, res) => {
    var sms = new Sms({ sender: req.decodedToken.contactId, ...req.body })
    sms.save(error => {
      if (error) {
        res.json({ info: 'Error while sending sms', error: error })
      }
      res.json({ info: 'SMS sent successfully' })
    })
  })

  // Get sms by ID
  router.get(`${URL_PREFIX}/:id`, verifyToken, (req, res) => {
    Sms.findById(req.params.id, (error, sms) => {
      if (error) {
        res.json({ info: 'Error while geting sms', error: error })
      }
      if (sms) {
        if (sms.receiver == req.decodedToken.contactId) {
          res.json(sms)
        } else {
          res.status(401).json({
            info: 'Error while geting sms',
            error: 'You are not authorised to view this sms'
          })
        }
      } else {
        res.status(404).json({
          info: 'Error while geting sms',
          error: 'The sms with the provided id does not exist'
        })
      }
    })
  })

  // Update status sms
  router.put(`${URL_PREFIX}/:id`, verifyToken, (req, res) => {
    Sms.findById(req.params.id, (error, sms) => {
      if (error) {
        res.json({ info: 'Error while updating sms', error: error })
      }
      if (sms) {
        if (sms.receiver == req.decodedToken.contactId) {
          _.merge(sms, req.body)
          sms.save(error => {
            if (error) {
              res.json({ info: 'Error while updating sms', error: error })
            }
            res.json({ info: 'Sms updated successfully.', body: sms })
          })
        } else {
          res.status(401).json({
            info: 'Error while geting sms',
            error: 'You are not authorised to update this sms'
          })
        }
      }
    })
  })
}
