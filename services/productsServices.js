
// loading user model
const { Products } = require('../models/Products');
const { ObjectId } = require("mongodb");

class ProductsServices {
    async create(_product) {
        return await Products.create(_product);
    }

    async update_product(_product_id, _product) {
        return await Products.findOneAndUpdate({ _id: typeof _product_id == 'object' ? _product_id : ObjectId.createFromHexString(_product_id) }, { $set: _product });
    }

    async delete_product(_product_id) {
        return await Products.deleteOne({ _id: typeof _product_id == 'object' ? _product_id : ObjectId.createFromHexString(_product_id) });
    }

    async delete_Many(_filters={}) {
        return await Products.deleteMany({..._filters});
    }

    async get_product_by_id(_product_id) {
        return await Products.findById({ _id: typeof _product_id == 'object' ? _product_id : ObjectId.createFromHexString(_product_id) })
        .populate({ path: 'tax', model: 'tax' })
        .populate({ path: 'product_type', model: 'type', populate: { path: 'sub_type', model: 'sub_type' }})
        .populate({ path: 'product_category', model: 'category' })
        .populate({ path: 'product_sub_category', model: 'sub_category' });
    }

    async get_product(_filters={}) {
        return await Products.find({..._filters})
        .populate({ path: 'tax', model: 'tax' })
        .populate({ path: 'product_type', model: 'type', populate: { path: 'sub_type', model: 'sub_type' }})
        .populate({ path: 'product_category', model: 'category' })
        .populate({ path: 'product_sub_category', model: 'sub_category' });
    }
}

module.exports = new ProductsServices();