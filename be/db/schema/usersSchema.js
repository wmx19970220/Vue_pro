const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    time: String
})

module.exports = usersSchema