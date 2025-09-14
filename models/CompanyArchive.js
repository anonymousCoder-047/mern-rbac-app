
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const companyArchiveSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        default: 0
    },
    companyId: {
        type: ObjectId,
        required: true
    },
    company_name: {
        type: String,
        default: "",
        required: false
    },
    file_paths: [{
        type: String,
        default: "",
        required: false
    }],
    uploaded_date: {
        type: String,
        default: "",
        required: false
    },
    updated_date: {
        type: String,
        default: "",
        required: false
    },
    description: {
        type: String,
        default: "",
        required: false
    },
    profileId: {
        type: ObjectId,
        required: false,
    },
    groupId: {
        type: ObjectId,
        required: false
    },
});

module.exports.CompanyArchive = new mongoose.model('company_archive', companyArchiveSchema, 'company_archive');