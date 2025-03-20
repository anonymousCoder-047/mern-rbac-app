
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const categorySchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        default: 0
    },
    category_name: {
        type: String,
        required: false,
        default: ""
    },
    category_code: {
        type: String,
        required: false,
        default: ""
    },
    sub_category: {
        type: ObjectId,
        required: false,
    },
});

module.exports.Category = new mongoose.model('category', categorySchema, 'category');