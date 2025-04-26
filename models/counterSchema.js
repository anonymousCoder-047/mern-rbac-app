
const mongoose = require('mongoose');

const counterSchema = mongoose.Schema({
    name: {
        type: String,
        default: "",
        requied: false
    },
    seq: {
        type: Number,
        requied: false,
        default: 0
    }
});

module.exports.counters = mongoose.model('counters', counterSchema, 'counters');