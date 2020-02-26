const express = require('express');
const authRouter = express.Router();

const User = require('../models/users');
const basicAuth = require('../middleware/basicAuth');


authRouter.post('/signup', (req, res, next) => {
  const user = new User(req.body)
  user.save()
    .then(result => res.status(200).json({ token: user.generateToken() }))
    .catch(next)
})

authRouter.post('/signin', basicAuth, (req, res, next) => {
  res.status(200).json({ token: req.token })
})

authRouter.get('/users', async (req, res, next) => {
  const allUsers = await User.find({})
  res.status(200).json(allUsers)
})

const handleOauth = require('../middleware/handleOauth')
authRouter.get('/oauth', handleOauth, (req, res, next) => {
  res.status(200).json({ message: 'signed in with oauth' })
})

authRouter.post('/send', (req, res, next) => {
  // send request to api
})

module.exports = authRouter