const route = require('express').Router()
const user = require('./user')

// Route Init
route.use('/api/user', user)

module.exports = route