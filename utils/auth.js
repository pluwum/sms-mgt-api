const jwt = require('jsonwebtoken')
require('dotenv').config()
const { sendResponse } = require('./misc')

module.exports.verifyToken = function (req, res, next) {
  var token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.headers['authorization'] ||
    req.headers['authorization']

  if (token) {
    jwt.verify(token, process.env.SECRET, function (error, decodedToken) {
      if (error) {
        return sendResponse(
          res,
          null,
          'Failed to authenticate token.',
          false,
          403,
          error
        )
      } else {
        req.decodedToken = decodedToken
        next()
      }
    })
  } else {
    return sendResponse(res, null, 'No token provided.', false, 403)
  }
}
