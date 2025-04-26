
const mongoose = require('mongoose')

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
    tax_amount: {
        type: mongoose.Schema.Types.Double,
        required: false,
        default: ""
    },
    tax_percentage: {
        type: String,
        required: false,
        default: ""
    },
});

module.exports.Tax = new mongoose.model('tax', taxSchema, 'tax');