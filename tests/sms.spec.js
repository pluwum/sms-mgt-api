const { expect } = require('chai')
const request = require('supertest')
const app = require('../app')
const { loginContact, cleanUp, createContact, createSMS } = require('./utils')
const { contactC } = require('./mocks')
var token
var smsA
var contactId

before(async function () {
  // set up here
  token = await loginContact(app)

  const contact = await createContact(app, contactC)
  contactId = contact.body.data._id

  smsA = { receiver: contactId, message: 'you up?' }
})

describe('Test SMS functionality', () => {
  it('Sends SMS', done => {
    request(app)
      .post('/api/v1/sms/')
      .send(smsA)
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .end(function (error, response) {
        expect(response.body.message).to.be.equal('SMS sent successfully')
        expect(response.body.success).to.be.true
        done()
      })
  })

  it('Get SMS', done => {
    request(app)
      .get('/api/v1/sms/')
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .end(function (error, response) {
        expect(response.body.message).to.be.equal('SMS collected succefully')
        expect(response.body.success).to.be.true
        done()
      })
  })
})

after(() => {
  cleanUp()
})
