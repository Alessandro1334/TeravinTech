const route = require('express').Router()
const employee = require('./employee')

// Route Init
route.use('/api/employee', employee)

module.exports = route