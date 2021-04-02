const express = require('express')
const routes = express.Router()
const teachers = require('../app/controllers/teachers')
const teachersValidator = require("../app/validators/teachers")

routes.get('/', teachers.index)

routes.post('/', teachersValidator.post, teachers.post)

routes.put('/', teachersValidator.put, teachers.update)

routes.delete('/', teachers.delete)

routes.get('/create', function(req, res) {
    return res.render("teachers/create")
})

routes.get('/:id', teachers.show)

routes.get('/:id/edit', teachers.edit)

module.exports = routes