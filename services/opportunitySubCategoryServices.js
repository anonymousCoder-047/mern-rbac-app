
// loading user model
const { OpportunitySubCategory } = require('../models/opportunitySubCategory');
const { ObjectId } = require("mongodb");

class OpportunitySubCategoryServices {
    async create(_opportunity_sub_category) {
        return await OpportunitySubCategory.create(_opportunity_sub_category);
    }

    async update_opportunity_sub_category(_opportunity_sub_category_id, _opportunity_sub_category) {
        return await OpportunitySubCategory.findOneAndUpdate({ _id: typeof _opportunity_sub_category_id == 'object' ? _opportunity_sub_category_id : ObjectId.createFromHexString(_opportunity_sub_category_id) }, { $set: _opportunity_sub_category });
    }

    async delete_opportunity_sub_category(_opportunity_sub_category_id) {
        return await OpportunitySubCategory.deleteOne({ _id: typeof _opportunity_sub_category_id == 'object' ? _opportunity_sub_category_id : ObjectId.createFromHexString(_opportunity_sub_category_id) });
    }

    async delete_Many(_filters={}) {
        return await OpportunitySubCategory.deleteMany({..._filters});
    }

    async get_opportunity_sub_category_by_id(_opportunity_sub_category_id) {
        return await OpportunitySubCategory.findById({ _id: typeof _opportunity_sub_category_id == 'object' ? _opportunity_sub_category_id : ObjectId.createFromHexString(_opportunity_sub_category_id) });
    }

    async get_opportunity_sub_category(_filters={}) {
        return await OpportunitySubCategory.find({..._filters})
        .populate({ path: 'profileId', model: 'profile' })
        .populate({ path: 'groupId', model: 'group', populate: [
            { path: 'group_manager', model: 'users' }
        ]})
    }
}

module.exports = new OpportunitySubCategoryServices();