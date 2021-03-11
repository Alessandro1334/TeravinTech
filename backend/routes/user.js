const route = require('express').Router()
const User = require('../app/controllers/userController')

route.get('/', User.getAll)
route.post('/', User.create)

module.exports = route