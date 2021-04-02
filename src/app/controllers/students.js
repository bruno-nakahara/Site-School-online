const { date, grades } = require('../../lib/utils')
const Student = require("../models/student")

module.exports = {
    index(req, res) {

        let {filter, page, limit} = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(students) {
                let total = 0

                if (students[0] == undefined) {
                    total = 0
                } else {
                    total = Math.ceil(students[0].total / limit)
                }
                const pagination = {
                    total,
                    page
                }

                return res.render('students/index', {students, pagination, filter})
            }
        }

        Student.paginate(params)
        
    },
    create(req, res) {
        
        Student.teacherOption(function(options) {
            return res.render("students/create", {teacherOptions:options})
        })        
    },
    async post(req, res) {
        const studentData = {
            ...req.body,
            grade: grades(req.body.grade)
        }

        const studentId = await Student.create(studentData)

        return res.redirect(`/students/${studentId}`)

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
    async update(req, res) {

        const studentData = {
            ...req.body,
            grade: grades(req.body.grade)
        }
        
        await Student.update(req.body.id, studentData)

        return res.redirect(`/students/${req.body.id}`)
       
    },
    async delete(req, res) {

        await Student.delete(req.body.id)

        return res.redirect('/students')
        
    }
}

