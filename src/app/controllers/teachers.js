const { date } = require('../../lib/utils')
const Teacher = require('../models/teacher')

module.exports = {
    index(req, res) {
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,

            callback(teachers) {
                let total = 0

                if (teachers[0] == undefined) {
                    total = 0
                } else {
                    total = Math.ceil(teachers[0].total / limit)
                }

                const pagination = {
                    total,
                    page
                }
            
                return res.render('teachers/index', {teachers, pagination, filter})
            }
        }

        Teacher.paginate(params)

    },
    async post(req, res) {
        const teacherData = {
            ...req.body,
            created_at: date(Date.now()).created_at
        }
        
        const teacherId = await Teacher.create(teacherData)

        return res.render("parts/success" , { teacher: teacherData })
        
    },
    show(req, res) {
        Teacher.find(req.params.id, function(teacher) {
            if (!teacher) return res.send('Teacher not found!')

            teacher.birth = date(teacher.birth).iso
            teacher.service = teacher.service.split(",")
            teacher.created_at = date(teacher.created_at).format

            return res.render('teachers/show', {teacher})
        })
    },
    edit(req, res) {
        Teacher.find(req.params.id, function(teacher) {
            if (!teacher) return res.send('Teacher not found!')

            teacher.birth = date(teacher.birth).iso
            teacher.created_at = date(teacher.created_at).iso

            return res.render('teachers/edit', {teacher})

        })
    },
    async update(req, res) {
        const teacher = true

        await Teacher.update(req.body.id, req.body)

        return res.render("parts/success" , { teacher })

    },
    async delete(req, res) {
        try {
            await Teacher.delete(req.body.id)

            const teacher = true

            return res.render("parts/delete-success", { teacher })
        } catch (err) {
            console.error(err)
            return res.render('parts/error')
        }  
    }
}


