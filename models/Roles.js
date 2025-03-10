
const mongoose = require('mongoose')

const roleSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        default: 0
    },
    name: {
        type: String,
        required: true,
        default: "user"
    },
    role_id: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports.Role = new mongoose.model('role', roleSchema, 'role');