
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const permissionsSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        default: 0
    },
    action: [{
        type: String,
        required: true,
        default: 0
    }],
    profileId: {
        type: ObjectId,
        required: true,
    },
});

module.exports.Permissions = new mongoose.model('permissions', permissionsSchema, 'permissions');