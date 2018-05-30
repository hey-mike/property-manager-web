const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

class TokenManager {

  constructor() {
    this.keys = {};
    this.privateKey = fs.readFileSync(path.join(__dirname, '/../../keys/private_key.pem')); // get private key;
    this.publicKey = fs.readFileSync(path.join(__dirname, '/../../keys/public_key.pem')); // get private key;
    this.options = {
      algorithm: 'RS256'
    };
  }
  setOptions(options) {
    this.options = options;
  }
  generateToken(payload) {
    return jwt.sign(payload, this.privateKey, this.options);
  }
  // refresh() {
  //   const payload = jwt.verify(token, this.secretOrPublicKey, refreshOptions.verify);
  //   delete payload.iat;
  //   delete payload.exp;
  //   delete payload.nbf;
  //   delete payload.jti; //We are generating a new token, if you are using jwtid during signing, pass it in refreshOptions
  //   const jwtSignOptions = Object.assign({}, this.options, {
  //     jwtid: refreshOptions.jwtid
  //   });
  //   // The first signing converted all needed options into claims, they are already in the payload
  //   return jwt.sign(payload, this.secretOrPrivateKey, jwtSignOptions);
  // }
  async verifyToken(token, callback) {
    return jwt.verify(token, this.publicKey, this.options, callback);
  }
}

module.exports = new TokenManager;