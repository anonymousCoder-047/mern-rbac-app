
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

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
    profileId: {
        type: ObjectId,
        required: false,
    },
    groupId: {
        type: ObjectId,
        required: false
    },
});

module.exports.SubCategory = new mongoose.model('sub_category', subCategorySchema, 'sub_category');