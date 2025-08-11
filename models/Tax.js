
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const taxSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        default: 0
    },
    tax_name: {
        type: String,
        required: false,
        default: ""
    },
    tax_percentage: {
        type: String,
        required: false,
        default: ""
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

module.exports.Tax = new mongoose.model('tax', taxSchema, 'tax');