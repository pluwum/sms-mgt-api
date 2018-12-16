'use strict'

require('dotenv').config()
const mongoose = require('mongoose')

module.exports.connectDatabase = () => {
  var DATABASE_URI = process.env.DATABASE_URI

  if (process.env.NODE_ENV === 'testing') {
    var DATABASE_URI = process.env.TEST_DATABASE_URI
  }

  // Set up database
  mongoose.connect(
    DATABASE_URI,
    {
      useNewUrlParser: true
    }
  )

  const db = mongoose.connection

  db.on('error', err => {
    console.error(`Error while connecting to DB: ${err.message}`)
  })
  db.once('open', () => {
    console.log(`DB connected to ${DATABASE_URI} successfully! `)
  })

  return db
}

module.exports.dropDatabase = connection => {
  connection.db.dropDatabase()
}
