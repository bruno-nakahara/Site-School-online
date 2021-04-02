async function post(req, res, next) {

    const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all the field")
            }
        }

    next()
}

async function put(req, res, next) {
    const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all the field")
            }
        }

    next()
}

module.exports = {
    post,
    put
}