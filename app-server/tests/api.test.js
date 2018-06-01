const request = require('supertest');
const app = require('../src/app');

describe('GET /api', () => {
  it('should return 200 OK', () => {
    return request(app)
      .get('/api')
      .expect(200);
  });
});
