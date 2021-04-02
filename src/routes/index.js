const express = require('express')
const routes = express.Router()

const teachers = require('./teachers')
const students = require('./students')

routes.get('/', function(req, res) {
    return res.redirect("/teachers")
})

routes.use('/teachers', teachers)
routes.use('/students', students)

module.exports = routes