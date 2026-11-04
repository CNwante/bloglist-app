const PORT = process.env.PORT
const password = process.env.DB_PASSWORD
let MONGODB_URI = process.env.MONGODB_URI

const encodedPassword = encodeURIComponent(password)

MONGODB_URI = MONGODB_URI.replace('DB_PASSWORD', encodedPassword)

module.exports = { PORT, MONGODB_URI }
