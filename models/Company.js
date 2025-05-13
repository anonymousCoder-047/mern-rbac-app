
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const companySchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        default: 0
    },
    company_name: {
        type: String,
        default: "",
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
    website: {
        type: String,
        default: "",
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

module.exports.Company = new mongoose.model('company', companySchema, 'company');