const db = require('../../config/db')
const Base = require("./Base")

Base.init({ table: 'teachers' })

module.exports = {
    ...Base,
    all(callback) {
        db.query(`
        SELECT teachers.*, count(students) AS total_students 
        FROM teachers
        LEFT JOIN students ON (students.teacher_id = teachers.id)
        GROUP BY teachers.id`, function(err, results) {
            if (err) throw `DATABASE error ${err}`

            callback(results.rows)
        })
    },
    find(id, callback) {
        db.query(`SELECT * FROM teachers WHERE id = $1`, [id], function(err, results) {
            if (err) throw `DATABASE error ${err}`

            callback(results.rows[0])
        })
    },
    findBy(filter, callback) {
        db.query(`
        SELECT teachers.*, count(students) AS total_students 
        FROM teachers
        LEFT JOIN students ON (students.teacher_id = teachers.id)
        WHERE teachers.name ILIKE '%${filter}%'
        OR teachers.lecture ILIKE '%${filter}%'
        GROUP BY teachers.id`, function(err, results) {
            if (err) throw `DATABASE error ${err}`

            callback(results.rows)
        })
    },
    paginate(params) {
        const {filter, limit, offset, callback} = params

        let query = "",
            filterQuery = "",
            totalQuery = `(
                SELECT count(*) FROM teachers
            ) AS total`

        if (filter) {

            filterQuery = `
            WHERE teachers.name ILIKE '%${filter}%'
            OR teachers.lecture ILIKE '%${filter}%'`

            totalQuery = `(
                SELECT count(*) FROM teachers 
                ${filterQuery}) AS total`

        }

        query = `
        SELECT teachers.*, ${totalQuery}, count(students) AS total_students 
        FROM teachers
        LEFT JOIN students ON (students.teacher_id = teachers.id)
        ${filterQuery}
        GROUP BY teachers.id LIMIT $1 OFFSET $2`

        db.query(query, [limit, offset], function(err, results) {
            if (err) throw `Database Error ${err}`

            callback(results.rows)
        })
    }
}
