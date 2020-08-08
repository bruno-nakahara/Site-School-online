module.exports = {
    age(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()
        const day = today.getDate() - birthDate.getDate()

        if (month < 0 || month == 0 && day < 0) {
            age = age -1
        }

        return age
    },
    graduation(level) {
        if (level == "ensino-medio") {
            return "Ensino Médio Completo"
        }else if (level == "ensino-superior") {
            return "Ensino Superio Completo"
        }else if (level == "master") {
            return "Mestrado"
        }else {
            return "Doutorado"
        }
    },
    date(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)
        const birthDay = `${day}/${month}`
        const format = `${day}-${month}-${year}`

        return {day, month, year, iso:`${year}-${month}-${day}`, birthDay, format}

    },
    grades(grade) {
        if (grade == "5EF") {
            return "5º ano Ensino Fundamental"
        }else if (grade == "6EF") {
            return "6º ano Ensino Fundamental"
        }else if (grade == "7EF") {
            return "7º ano Ensino Fundamental"
        }else if (grade == "8EF") {
            return "8º ano Ensino Fundamental"
        }else if (grade == "9EF") {
            return "9º ano Ensino Fundamental"
        }else if (grade == "1EM") {
            return "1º ano Ensino Médio"
        }else if (grade == "2EM") {
            return "2º ano Ensino Médio"
        }else if (grade == "3EM") {
            return "3º ano Ensino Médio"
        }else {
            return
        }
    }
}