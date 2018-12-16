const request = require('supertest')
const { contactB } = require('./mocks')
const { connectDatabase, dropDatabase } = require('../utils/database')

exports.loginContact = app => {
  return this.createContact(app).then(() => {
    return request(app)
      .post('/api/v1/authenticate/')
      .send(contactB)
      .set('Content-Type', 'application/json')
      .then(function (response) {
        return response.body.data
      })
  })
}

exports.createContact = (app, contact) => {
  contact = contact || contactB

  return request(app)
    .post('/api/v1/contact/')
    .send(contact)
    .set('Content-Type', 'application/json')
}

exports.createSMS = (app, sms, token) => {
  return request(app)
    .post('/api/v1/sms')
    .send(sms)
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
}

exports.cleanUp = () => {
  // Connect to the db and remove test data
  const connection = connectDatabase()
  dropDatabase(connection)
}
