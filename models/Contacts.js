
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
    email: {
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
    phone: {
        type: String,
        default: "",
        required: false
    },
    secondary_phone: {
        type: String,
        default: "",
        required: false
    },
    description: {
        type: String,
        required: false,
        default: ""
    },
});

module.exports.Contacts = new mongoose.model('contacts', contactsSchema, 'contacts');