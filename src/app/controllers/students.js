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

        return res.render("parts/success" , { student: studentData })

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
        try {
            const studentData = {
                ...req.body,
                grade: grades(req.body.grade)
            }
            
            await Student.update(req.body.id, studentData)
    
            return res.render("parts/success" , { student: studentData })

        } catch (err) {
            console.error(err)
            return res.render('parts/error')
        }       
    },
    async delete(req, res) {
        try {
            await Student.delete(req.body.id)

            const student = true

            return res.render("parts/delete-success", { student })
        } catch (err) {
            console.error(err)
            return res.render('parts/error')
        }  
    }
}

