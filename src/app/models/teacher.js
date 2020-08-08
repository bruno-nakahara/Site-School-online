const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
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
    create(data, callback) {
        const query = `
            INSERT INTO teachers (
                name,
                avatar_url,
                birth,
                level,
                service,
                lecture,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `
        const values = [
            data.name,
            data.avatar_url,
            date(data.birth).iso,
            data.level,
            data.service,
            data.lecture,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results) {
            if (err) throw `DATABASE error ${err}`

            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query(`SELECT * FROM teachers WHERE id = $1`, [id], function(err, results) {
            if (err) throw `DATABASE error ${err}`

            callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `
            UPDATE teachers SET
            name=($1),
            avatar_url=($2),
            birth=($3),
            level=($4),
            service=($5),
            lecture=($6)
        WHERE id = $7
        `

        const values = [
            data.name,
            data.avatar_url,
            date(data.birth).iso,
            data.level,
            data.service,
            data.lecture,
            data.id
        ]

        db.query(query, values, function(err, results) {
            if (err) throw `DATABASE error ${err}`

            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM teachers WHERE id = $1`, [id], function(err, results) {
            if (err) throw `Database Error ${err}`

            return callback()
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
    }
}
