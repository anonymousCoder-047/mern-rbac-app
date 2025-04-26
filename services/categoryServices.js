
// loading user model
const { Category } = require('../models/Category');
const { ObjectId } = require("mongodb");

class CategoryServices {
    async create(_category) {
        return await Category.create(_category);
    }

    async update_category(_category_id, _category) {
        return await Category.findOneAndUpdate({ _id: typeof _category_id == 'object' ? _category_id : ObjectId.createFromHexString(_category_id) }, { $set: _category });
    }

    async delete_category(_category_id) {
        return await Category.deleteOne({ _id: typeof _category_id == 'object' ? _category_id : ObjectId.createFromHexString(_category_id) });
    }

    async delete_Many(_filters={}) {
        return await Category.deleteMany({..._filters});
    }

    async get_category_by_id(_category_id) {
        return await Category.findById({ _id: typeof _category_id == 'object' ? _category_id : ObjectId.createFromHexString(_category_id) }).populate({ path: 'sub_category', model: 'sub_category' });
    }

    async get_category(_filters={}) {
        return await Category.find({..._filters}).populate({ path: 'sub_category', model: 'sub_category' });
    }
}

module.exports = new CategoryServices();