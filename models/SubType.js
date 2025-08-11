
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

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
    profileId: {
        type: ObjectId,
        required: false,
    },
    groupId: {
        type: ObjectId,
        required: false
    },
});

module.exports.SubType = new mongoose.model('sub_type', subTypeSchema, 'sub_type');