const faker = require("faker")

const { date } = require("./src/lib/utils")

const Teacher = require("./src/app/models/teacher")
const Student = require("./src/app/models/student")

let teachersId = []
let totalTeachers = 10
let totalStudents = 5

const levelList = [ "ensino-medio", "ensino-superior", "master", "phd" ]
const serviceList = [ "presencial", "distancia" ]
const gradeList = [ 
    "5º ano Ensino Fundamental", 
    "6º ano Ensino Fundamental", 
    "7º ano Ensino Fundamental", 
    "8º ano Ensino Fundamental", 
    "9º ano Ensino Fundamental",
    "1º ano Ensino Médio",
    "2º ano Ensino Médio",
    "3º ano Ensino Médio"
]

function randomValue(list) {
    return list[Math.floor(Math.random() * list.length)]
}

async function createTeachers() {
    const teachers = []

    while (teachers.length < totalTeachers) {
        teachers.push({
            avatar_url: faker.image.imageUrl(),
            name: faker.name.firstName(), 
            birth: faker.date.past(),
            level: randomValue(levelList),
            service: randomValue(serviceList),
            lecture: faker.random.words().replace(/\s/g, ","),
            created_at: faker.date.recent()
        })
    }

    const teachersPromise = teachers.map(async teacher => {
        const teacherData = {
            ...teacher,
            birth: date(teacher.birth).iso,
            created_at: date(teacher.created_at).created_at
        }
        const teacher_id = await Teacher.create(teacherData)
        teachersId.push(teacher_id)
    })

    await Promise.all(teachersPromise)
}

async function createStudents() {
    const students = []
    
    while (students.length < totalStudents) {
        students.push({
            avatar_url: faker.image.imageUrl(),
            name: faker.name.firstName(), 
            email: faker.internet.email(),
            birth: faker.date.past(),
            grade: randomValue(gradeList),
            courseload: faker.random.number(99),
            teacher_id: teachersId[Math.floor(Math.random() * totalTeachers)]
        })
    }
    
    const studentPromise = students.map(student => {
        const studentData = {
            ...student,
            birth: date(student.birth).iso
        }

        Student.create(studentData)
    })
    
    await Promise.all(studentPromise)
}

async function init() {
    await createTeachers()
    await createStudents()
}

init()

