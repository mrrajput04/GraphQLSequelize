const {SECRET_KEY} = require('../config');
const jwt = require('jsonwebtoken');

class JwtService {
    static sign(payload, secret = SECRET_KEY, expiry = "2h") {
      return jwt.sign(payload, secret, { expiresIn: expiry });
    }
  
    static verify(token, secret = SECRET_KEY) {
      return jwt.verify(token, secret);
    }
  }
  
  module.exports = JwtService;