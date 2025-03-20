
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const productsSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        default: 0
    },
    product_name: {
        type: String,
        required: true,
        default: ""
    },
    product_code: {
        type: String,
        required: false,
        default: ""
    },
    qty_ordered: {
        type: Number,
        required: false,
        default: 0
    },
    unit_price: {
        type: mongoose.Schema.Types.Double,
        required: false,
        default: 0.0
    },
    description: {
        type: String,
        required: false,
        default: ""
    },
    tax: [{
        type: ObjectId,
        required: false,
    }],
    product_type: {
        type: ObjectId,
        required: false,
    },
    product_category: {
        type: ObjectId,
        required: false,
    },
    product_sub_category: {
        type: ObjectId,
        required: false,
    },
    custom_fields: {
        type: Object,
        required: false,
        default: {}
    },
});

module.exports.Products = new mongoose.model('products', productsSchema, 'products');