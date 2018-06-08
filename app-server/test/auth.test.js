const request = require('supertest');
const chai = require('chai');
const app = require('../src/app');
const mongoose = require('../src/config/mongoose.js');

const expect = chai.expect;

describe('Auth Tests', function() {
  before(async (done) => {
    await mongoose.connectTest();

    // Renew a database
    await mongoose.drop();
    done();
  });
  describe('Registration Tests', function() {
    it('should return the user if the email is valid', function(done) {
      request(app)
        .post('/api/auth/register')
        .send({
          email: 'JoshMatz@test.com',
          password: 'password123'
        })
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.email).to.be.equal('JoshMatz@test.com');
          done();
        });
    });
  });

  after(function(done){
    mongoose.drop();
    done()
  });
});
// describe('POST user register', () => {
//   it('should return 200 OK', () => {
//     return request(app)
//       .post('/api/auth/register')
//       .send({
//         email: 'john',
//         password: 'test'
//       })
//       .expect(200);
//   });
// });

// describe('POST user login', () => {
//   it('should return auth token', () => {
//     return request(app)
//       .post('/api/auth/login')
//       .expect(200);
//   });
// });
