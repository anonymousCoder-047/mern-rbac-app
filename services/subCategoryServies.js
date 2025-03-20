
// loading user model
const { SubCategory } = require('../models/SubCategory');
const { ObjectId } = require("mongodb");

class SubCategoryServices {
    async create(_sub_category) {
        return await SubCategory.create(_sub_category);
    }

    async update_sub_category(_sub_category_id, _sub_category) {
        return await SubCategory.findOneAndUpdate({ _id: typeof _sub_category_id == 'object' ? _sub_category_id : ObjectId.createFromHexString(_sub_category_id) }, { $set: _sub_category });
    }

    async delete_sub_category(_sub_category_id) {
        return await SubCategory.deleteOne({ _id: typeof _sub_category_id == 'object' ? _sub_category_id : ObjectId.createFromHexString(_sub_category_id) });
    }

    async delete_Many(_filters={}) {
        return await SubCategory.deleteMany({..._filters});
    }

    async get_sub_category_by_id(_sub_category_id) {
        return await SubCategory.findById({ _id: typeof _sub_category_id == 'object' ? _sub_category_id : ObjectId.createFromHexString(_sub_category_id) });
    }

    async get_sub_category(_filters={}) {
        return await SubCategory.find({..._filters});
    }
}

module.exports = new SubCategoryServices();