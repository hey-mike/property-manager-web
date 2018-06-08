var expect = require('chai').expect;
 
const User = require('../src/models/user');
 
describe('User model tests', function() {
    it('should be invalid if email is empty', function(done) {
        var user = new User();
 
        user.validate(function(err) {
            expect(err.errors.email).to.exist;
            done();
        });
    });
});