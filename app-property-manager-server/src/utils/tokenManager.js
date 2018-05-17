const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

class TokenManager {

  constructor() {
    this.keys = {};
    this.keys['private_key'] = fs.readFileSync(path.join(__dirname, '/../../keys/private_key.pem')); // get private key;
    this.keys['public_key'] = fs.readFileSync(path.join(__dirname, '/../../keys/public_key.pem')); // get private key;
  }
  setOptions(options) {
    this.options = options;
  }
  sign() {
    const jwtSignOptions = Object.assign({}, signOptions, this.options);
    return jwt.sign(payload, this.secretOrPrivateKey, jwtSignOptions);
  }
  refresh() {
    const payload = jwt.verify(token, this.secretOrPublicKey, refreshOptions.verify);
    delete payload.iat;
    delete payload.exp;
    delete payload.nbf;
    delete payload.jti; //We are generating a new token, if you are using jwtid during signing, pass it in refreshOptions
    const jwtSignOptions = Object.assign({}, this.options, {
      jwtid: refreshOptions.jwtid
    });
    // The first signing converted all needed options into claims, they are already in the payload
    return jwt.sign(payload, this.secretOrPrivateKey, jwtSignOptions);
  }
  verify() {
    return jwt.verify(token, cert, { algorithm: 'RS256'}, (err, decoded));
  }
}
// function TokenGenerator(secretOrPrivateKey, secretOrPublicKey, options) {
//   this.secretOrPrivateKey = secretOrPrivateKey;
//   this.secretOrPublicKey = secretOrPublicKey;
//   this.options = options; //algorithm + keyid + noTimestamp + expiresIn + notBefore
// }

// TokenGenerator.prototype.sign = function (payload, signOptions) {
//   const jwtSignOptions = Object.assign({}, signOptions, this.options);
//   return jwt.sign(payload, this.secretOrPrivateKey, jwtSignOptions);
// }

// // refreshOptions.verify = options you would use with verify function
// // refreshOptions.jwtid = contains the id for the new token
// TokenGenerator.prototype.refresh = function (token, refreshOptions) {
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

module.exports = new TokenManager;
