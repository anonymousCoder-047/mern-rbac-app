
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

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
    },
    profileId: {
        type: ObjectId,
        required: false,
    }
});

module.exports.Users = new mongoose.model('users', userSchema, 'users');