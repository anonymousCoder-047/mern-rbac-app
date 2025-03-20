
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const contactsSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        default: 0
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
    secondary_email: {
        type: String,
        default: "",
        required: false
    },
    company_name: {
        type: ObjectId,
        required: false
    },
    mobile: {
        type: String,
        default: "",
        required: false
    },
    phone: {
        type: String,
        default: "",
        required: false
    },
    mailing_street: {
        type: String,
        required: false,
        default: ""
    },
    mailing_city: {
        type: String,
        required: false,
        default: ""
    },
    mailing_state: {
        type: String,
        required: false,
        default: ""
    },
    mailing_country: {
        type: String,
        required: false,
        default: ""
    },
    mailing_code: {
        type: String,
        required: false,
        default: ""
    },
});

module.exports.Contacts = new mongoose.model('contacts', contactsSchema, 'contacts');