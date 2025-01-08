
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        default: 0
    },
    username: {
        type: String,
        required: true,
        default: ""
    },
    email: {
        type: String,
        required: true,
        default: ""
    },
    password: {
        type: String,
        required: true,
        default: ""
    }
});

module.exports.Users = new mongoose.model('users', userSchema, 'users');