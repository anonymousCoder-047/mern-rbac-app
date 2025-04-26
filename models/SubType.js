
const mongoose = require('mongoose')

const subTypeSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        default: 0
    },
    sub_type_name: {
        type: String,
        required: false,
        default: ""
    },
    sub_type_code: {
        type: String,
        required: false,
        default: ""
    },
});

module.exports.SubType = new mongoose.model('sub_type', subTypeSchema, 'sub_type');