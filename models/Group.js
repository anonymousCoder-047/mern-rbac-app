
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const groupSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        default: 0
    },
    group_name: {
        type: String,
        default: "",
        required: true
    },
    alias: {
        type: String,
        default: "",
        required: true
    },
    group_description: {
        type: String,
        default: "",
        required: true
    },
    group_manager: {
        type: ObjectId,
        required: false
    },
    group_members: [{
        type: ObjectId,
        required: false
    }]
});

module.exports.Group = new mongoose.model('group', groupSchema, 'group');