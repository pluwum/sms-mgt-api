const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = function (req, res, next) {
  var token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.headers['authorization'] ||
    req.headers['authorization']

  if (token) {
    jwt.verify(token, process.env.SECRET, function (error, decodedToken) {
      if (error) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.'
        })
      } else {
        req.decodedToken = decodedToken
        next()
      }
    })
  } else {
    return res.status(403).json({
      success: false,
      info: 'No token provided.'
    })
  }
}

module.exports.verifyToken = verifyToken
