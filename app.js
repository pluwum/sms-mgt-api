const express = require('express')
const routes = require('./routes/')

const app = express()
const router = express.Router()
const port = 3000

routes(router)
app.use('/api', router)
app.listen(port, () => console.log(`server running on ${port}`))
