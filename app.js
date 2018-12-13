const express = require('express')
const routes = require('./routes/')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const router = express.Router()
const port = 3000

// Set up middleware
app.use(cors())
app.use(bodyParser.json())

// Set up routes
routes(router)
app.use('/api', router)
app.listen(port, () => console.log(`server running on ${port}`))
