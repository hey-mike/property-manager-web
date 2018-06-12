const request = require('supertest');
const chai = require('chai');
const app = require('../src/app');
const mongoose = require('../src/config/mongoose.js');

const expect = chai.expect;

describe('Auth', function() {
  before(async (done) => {
    mongoose.connectTest();
    done();
  });
  describe('Register Tests', function() {
    it('should return status code 422', function(done) {
      request(app)
        .post('/api/auth/register')
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.statusCode).to.be.equal(422);
          done();
        });
    });
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
          expect(res.body).to.have.property('email');
          expect(res.body.email).to.be.equal('JoshMatz@test.com');
          done();
        });
    });
  });

  describe('Login Tests', function() {
    it('should return status code 400 if the credential is invalid', function(done) {
      request(app)
        .post('/api/auth/login')
        .send({
          email: 'JoshMat2z@test.com',
          password: 'password123'
        })
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
    it('should return token if the credential is valid', function(done) {
      request(app)
        .post('/api/auth/login')
        .send({
          email: 'JoshMatz@test.com',
          password: 'password123'
        })
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.statusCode).to.be.equal(200);
          expect(res.body).to.have.property('token');
          expect(res.body.token).to.be.a('string');
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
