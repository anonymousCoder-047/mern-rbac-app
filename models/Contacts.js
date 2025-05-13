
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const contactsSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        default: 0
    },
    profile_picture: {
        type: String,
        default: "",
        required: false
    },
    first_name: {
        type: String,
        default: "",
        required: false
    },
    last_name: {
        type: String,
        default: "",
        required: false
    },
    job_title: {
        type: String,
        default: "",
        required: false
    },
    company_name: {
        type: ObjectId,
        required: false
    },
    email: {
        type: String,
        default: "",
        required: false
    },
    primary_phone: {
        type: String,
        default: "",
        required: false
    },
    secondary_phone: {
        type: String,
        default: "",
        required: false
    },
    dob: {
        type: String,
        default: "",
        required: false
    },
    source: {
        type: ObjectId,
        required: false
    },
    description: {
        type: String,
        default: "",
        required: false
    },
    street: {
        type: String,
        required: false,
        default: ""
    },
    city: {
        type: String,
        required: false,
        default: ""
    },
    state: {
        type: String,
        required: false,
        default: ""
    },
    country: {
        type: String,
        required: false,
        default: ""
    },
    code: {
        type: String,
        required: false,
        default: ""
    },
});

module.exports.Contacts = new mongoose.model('contacts', contactsSchema, 'contacts');