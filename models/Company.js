
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
    phone: {
        type: String,
        default: "",
        required: false
    },
    website: {
        type: String,
        default: "",
        required: false
    },
    billing_street: {
        type: String,
        required: false,
        default: ""
    },
    billing_city: {
        type: String,
        required: false,
        default: ""
    },
    billing_state: {
        type: String,
        required: false,
        default: ""
    },
    billing_country: {
        type: String,
        required: false,
        default: ""
    },
    billing_code: {
        type: String,
        required: false,
        default: ""
    },
});

module.exports.Company = new mongoose.model('company', companySchema, 'company');