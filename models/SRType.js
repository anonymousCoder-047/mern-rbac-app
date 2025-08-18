
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const SRTypeSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        default: 0
    },
    sr_name: {
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

module.exports.SRType = new mongoose.model('sr_type', SRTypeSchema, 'sr_type');