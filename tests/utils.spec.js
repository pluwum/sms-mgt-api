const { expect } = require('chai')
const express = require('express')
const {
  sendResponse,
  validateInput,
  sendValidationErrorResponse
} = require('../utils/misc')
const { contactB } = require('./mocks')

var response = {
  body: {},
  status: function (status) {
    return {
      json: function (data) {
        return data
      }
    }
  }
}

describe('Test helper Utilities', () => {
  it('validates data correctly', () => {
    const { name, phoneNumber, passCode } = contactB

    var validation = validateInput({
      name: { value: name, required: true },
      phoneNumber: { value: phoneNumber, required: true, length: 10 },
      passCode: { value: passCode, required: true, minLength: 5 }
    })
    expect(validation.passed).to.be.true
  })

  it('validates required fields correctly ', () => {
    const { phoneNumber, passCode } = contactB

    var validation = validateInput({
      name: { value: '', required: true },
      phoneNumber: { value: phoneNumber, required: true, length: 10 },
      passCode: { value: passCode, required: true, minLength: 5 }
    })

    var result = sendValidationErrorResponse(response, validation)
    expect(result.success).to.be.false
    expect(result.error).to.deep.include({ name: ['is required'] })
  })

  it('validates min length of fields correctly ', () => {
    const { phoneNumber, passCode } = contactB

    var validation = validateInput({
      name: { value: 'Patric', required: true },
      phoneNumber: { value: phoneNumber, required: true, length: 10 },
      passCode: { value: '123', required: true, minLength: 5 }
    })

    var result = sendValidationErrorResponse(response, validation)

    expect(result.success).to.be.false
    expect(result.error).to.deep.include({
      passCode: ['length should be more than 5']
    })
  })

  it('validates length of fields correctly ', () => {
    const { phoneNumber, passCode } = contactB

    var validation = validateInput({
      name: { value: 'Patrick', required: true },
      phoneNumber: { value: '07746', required: true, length: 10 },
      passCode: { value: passCode, required: true, minLength: 5 }
    })

    var result = sendValidationErrorResponse(response, validation)

    expect(result.success).to.be.false
    expect(result.error).to.deep.include({
      phoneNumber: ['length should be 10']
    })
  })
})
