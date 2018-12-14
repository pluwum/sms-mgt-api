'use strict'

const express = require('express')
const routes = require('./routes/')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const router = express.Router()
const port = 3000

// Set up database
mongoose.connect(
  'mongodb://localhost:27017/smsApp',
  {
    useNewUrlParser: true
  }
)
const db = mongoose.connection

db.on('error', err => {
  console.error(`Error while connecting to DB: ${err.message}`)
})
db.once('open', () => {
  console.log('DB connected successfully!')
})

// Set up middleware
app.use(cors())
app.use(bodyParser.json())

// Set up routes
routes(router)
app.use('/api', router)
app.listen(port, () => console.log(`server running on ${port}`))
