
const moment = require('moment')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const profileSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        default: 0
    },
    username: {
        type: String,
        default: "",
        required: false
    },
    email: {
        type: String,
        default: "",
        required: false
    },
    phone: {
        type: String,
        default: "",
        required: false
    },
    date_created: {
        type: Date,
        default: moment(new Date()).format(),
        required: true
    },
    last_login: {
        type: Date,
        default: moment(new Date()).format(),
        required: true
    },
    roleId: {
        type: ObjectId,
        required: false
    },
    groupId: {
        type: ObjectId,
        required: false
    },
});

module.exports.Profile = new mongoose.model('profile', profileSchema, 'profile');