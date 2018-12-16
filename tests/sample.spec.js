const { expect } = require('chai')
const request = require('supertest')
const app = require('../app')
const { connectDatabase, dropDatabase } = require('../utils/database')
const contactA = {
  name: 'Patrick',
  phoneNumber: '0774644187',
  passCode: '12345'
}
const contactB = {
  name: 'Luwum A',
  phoneNumber: '0774644189',
  passCode: '12345'
}

before(() => {
  // set up here
})

describe('SMS mgt App', () => {
  it('Throws 404 when url is invalid', () => {
    request(app)
      .get('/khkh')
      .expect(401)
  })

  it('Test Creating a new contact', done => {
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
})
after(() => {
  // Connect to the db and remove test data
  const connection = connectDatabase()
  dropDatabase(connection)
})
