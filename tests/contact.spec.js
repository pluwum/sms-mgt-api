const { expect } = require('chai')
const request = require('supertest')
const app = require('../app')
const { loginContact, cleanUp } = require('./utils')
const { contactA, sms } = require('./mocks')
var token

before(async function () {
  // set up here
  token = await loginContact(app)
})

describe('Test contact functionality', () => {
  it('Createst a new contact', done => {
    request(app)
      .post('/api/v1/contact/')
      .send(contactA)
      .set('Content-Type', 'application/json')
      .end(function (error, response) {
        expect(response.body.message).to.be.equal(
          'Contact created successfully'
        )
        expect(response.body.success).to.be.true
        done()
      })
  })

  it('Get my Contact', done => {
    request(app)
      .get('/api/v1/contact/')
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .end(function (error, response) {
        expect(response.body.success).to.be.true
        done()
      })
  })
})

after(() => {
  cleanUp()
})
