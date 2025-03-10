
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const permissionsSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        default: 0
    },
    sections: [{
        type: String,
        required: true,
        default: ""
    }],
    fields: [{
        type: String,
        required: true,
        default: ""
    }],
    attributes: [{
        type: String,
        required: true,
        default: ""
    }],
    groupId: {
        type: ObjectId,
        required: true,
    },
});

module.exports.Permissions = new mongoose.model('permissions', permissionsSchema, 'permissions');