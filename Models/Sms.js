'use strict'

const mongoose = require('mongoose')

const SmsSchema = mongoose.Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'sent' },
  created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Sms', SmsSchema)
