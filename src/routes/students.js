const express = require('express')
const routes = express.Router()

const students = require('../app/controllers/students')
const studentsValidator = require("../app/validators/students")

routes.get('/', students.index)

routes.post('/', studentsValidator.post, students.post)

routes.put('/', studentsValidator.put, students.update)

routes.delete('/', students.delete)

routes.get('/create', students.create)

routes.get('/:id', students.show)

routes.get('/:id/edit', students.edit)

module.exports = routes