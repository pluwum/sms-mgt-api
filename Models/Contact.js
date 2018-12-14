'use strict'

const mongoose = require('mongoose')

const ContactSchema = mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, dropDups: true },
  passCode: { type: String, required: true },
  created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Contact', ContactSchema)
