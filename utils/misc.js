'use strict'

const _ = require('lodash')

module.exports.sendResponse = (
  response,
  data,
  message = '',
  success = true,
  statusCode = 200,
  error = null
) => {
  var info = {}

  Object.assign(
    info,
    (success || !success) && { success },
    data && { data },
    message && { message },
    error && { error }
  )

  return response.status(statusCode).json(info)
}

module.exports.validateInput = inputs => {
  // input : { value, required, type {Number, String, Email}, length}
  // ruleSet = { required, type, lenghth }
  var errors = {}
  var passed = true

  Object.keys(inputs).forEach(input => {
    var rules = _.get(inputs, `${input}`)
    var inputErrors = []
    // Check for required fields
    if (rules.required) {
      if (!rules.value) {
        inputErrors.push(`is required`)
      }
    }

    if (rules.value) {
      if (rules.length) {
        if (rules.value.length !== rules.length) {
          inputErrors.push(`length should be ${rules.length}`)
        }
      }

      if (rules.minLength) {
        if (rules.value.length < rules.minLength) {
          inputErrors.push(`length should be more than ${rules.minLength}`)
        }
      }

      if (rules.maxLength) {
        if (rules.value.length < rules.maxLength) {
          inputErrors.push(`length cannot be more than ${rules.maxLength}`)
        }
      }
    }

    if (inputErrors.length) {
      errors[input] = inputErrors
    }
  })

  if (Object.keys(errors).length) {
    passed = false
  }
  return { errors, passed }
}

module.exports.sendValidationErrorResponse = (request, validationObj) => {
  const { errors } = validationObj
  var combineErrorMessage = []

  if (Object.keys(errors).length) {
    Object.keys(errors).forEach(input => {
      combineErrorMessage.push(
        `${input} ${_.join(_.get(errors, `${input}`), ', ')}`
      )
    })
  }

  var errorMessage = _.join(combineErrorMessage, ' and ')
  return this.sendResponse(
    request,
    null,
    `ValidationError: ${errorMessage}`,
    false,
    400,
    errors
  )
}
