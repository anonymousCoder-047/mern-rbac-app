
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const typeSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        default: 0
    },
    type_name: {
        type: String,
        required: false,
        default: ""
    },
    type_code: {
        type: String,
        required: false,
        default: ""
    },
    sub_type: {
        type: ObjectId,
        required: false,
    },
});

module.exports.Type = new mongoose.model('type', typeSchema, 'type');