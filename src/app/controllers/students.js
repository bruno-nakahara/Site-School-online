const { date, grades } = require('../../lib/utils')
const Student = require("../models/student")

module.exports = {
    index(req, res) {

        Student.all(function(students) {
            return res.render('students/index', {students})
        })
        
    },
    create(req, res) {
        Student.teacherOption(function(options) {
            return res.render("students/create", {teacherOptions:options})
        })        
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all the field")
            }
        }

        Student.create(req.body, function(student) {
            return res.redirect(`/students`)
        })
        
    },
    show(req, res) {
        Student.find(req.params.id, function(student) {
            if (!student) return res.send('Student not found!')

            student.birth = date(student.birth).iso

            return res.render('students/show', {student})
        })
    },
    edit(req, res) {
        Student.find(req.params.id, function(student) {
            if (!student) return res.send('Student not found!')

            student.birth = date(student.birth).iso

            Student.teacherOption(function(options) {
                return res.render("students/edit", {student, teacherOptions:options})
            })  
        })
    },
    update(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all the field")
            }
        }

        Student.update(req.body, function() {
            return res.redirect(`/students/${req.body.id}`)
        })
    },
    delete(req, res) {
        Student.delete(req.body.id, function() {
            return res.redirect('/students')
        })
    }
}

