const route = require('express').Router()
const Employee = require('../app/controllers/employeeController')

route.get('/', Employee.getAll)
route.post('/', Employee.create)
route.get('/:id', Employee.getById)
route.put('/:id', Employee.update)
route.delete('/:id', Employee.delete)

module.exports = route