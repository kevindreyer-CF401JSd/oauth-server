const base64 = require('base-64')
const User = require('../models/users')

function basicAuth (req, res, next) {
  // check if we have an authorization header
  if (!req.headers.authorization) {
    next(new Error('No authorization header'))
  }

  const basic = req.headers.authorization.split(' ').pop()
  const decoded = base64.decode(basic) // gives us "user:pass"
  const [user, pass] = decoded.split(':') // split on ":"

  return User.authenticateBasic(user, pass)
    .then(_validate)

  function _validate (user) {
    if (user) {
      req.user = user
      req.token = user.generateToken()
      next()
    } else {
      next(new Error('you screwed it up'))
    }
  }
}

module.exports = basicAuth
