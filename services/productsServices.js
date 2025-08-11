
// loading user model
const { Products } = require('../models/Products');
const { ObjectId } = require("mongodb");

class ProductsServices {
    async create(_product) {
        return await Products.create(_product);
    }
    
    async createMany(_products) {
        return await Products.insertMany(_products);
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
        .populate({ path: 'tax', model: 'tax' });
    }

    async get_product(_filters={}) {
        return await Products.find({..._filters})
        .populate({ path: 'tax', model: 'tax' });
    }
}

module.exports = new ProductsServices();