const jsonwebtoken = require('jsonwebtoken');
const Promise = require('bluebird');

const jwt = Promise.promisifyAll(jsonwebtoken);

const visa = async (req, res, next) => {
  let token =
    req.body['access-token'] ||
    req.query['access-token'] ||
    req.headers['access-token'] ||
    req.cookies.reconToken ||
    req.signedCookies.reconToken;

  if (req.cookies.reconToken && req.headers['access-token'])
    token = req.headers['access-token'];
  if (
    req.cookies.reconAppToken &&
    req.cookies.reconToken &&
    !req.headers['access-token']
  )
    token = req.cookies.reconAppToken;

  if (token) {
    try {
      const decoded = await jwt.verify(token, process.env.jwtPrivateKey);
      req.user = decoded;
      req.user.token = token;
      req.decoded = decoded;
      return next();
    } catch (err) {
      return next();
    }
  } else {
    return next();
  }
};

module.exports = visa;
