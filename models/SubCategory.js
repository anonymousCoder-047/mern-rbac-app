
const mongoose = require('mongoose')

const subCategorySchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        default: 0
    },
    sub_category_name: {
        type: String,
        required: false,
        default: ""
    },
    sub_category_code: {
        type: String,
        required: false,
        default: ""
    },
});

module.exports.SubCategory = new mongoose.model('sub_category', subCategorySchema, 'sub_category');