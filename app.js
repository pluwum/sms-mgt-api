'use strict'

require('dotenv').config()
const express = require('express')
const { routes, handle404, handle500 } = require('./Routes')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const morgan = require('morgan')
const { connectDatabase } = require('./utils/database')
const app = express()
const router = express.Router()

var port = 3000

if (process.env.NODE_ENV === 'testing') {
  port = process.env.TEST_PORT
}

// Create database connection
const db = connectDatabase()

// Set up middleware
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())

// Set up routes
routes(router)
app.use('/api/v1', router)
app.use(handle404())
app.use(handle500())

app.listen(port, () => console.log(`server running on ${port}`))

module.exports = app
