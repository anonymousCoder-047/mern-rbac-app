
// loading user model
const { OpportunityCategory } = require('../models/opportunityCategory');
const { ObjectId } = require("mongodb");

class OpportunityCategoryServices {
    async create(_opportunity_category) {
        return await OpportunityCategory.create(_opportunity_category);
    }

    async update_opportunity_category(_opportunity_category_id, _opportunity_category) {
        return await OpportunityCategory.findOneAndUpdate({ _id: typeof _opportunity_category_id == 'object' ? _opportunity_category_id : ObjectId.createFromHexString(_opportunity_category_id) }, { $set: _opportunity_category });
    }

    async delete_opportunity_category(_opportunity_category_id) {
        return await OpportunityCategory.deleteOne({ _id: typeof _opportunity_category_id == 'object' ? _opportunity_category_id : ObjectId.createFromHexString(_opportunity_category_id) });
    }

    async delete_Many(_filters={}) {
        return await OpportunityCategory.deleteMany({..._filters});
    }

    async get_opportunity_category_by_id(_opportunity_category_id) {
        return await OpportunityCategory.findById({ _id: typeof _opportunity_category_id == 'object' ? _opportunity_category_id : ObjectId.createFromHexString(_opportunity_category_id) });
    }

    async get_opportunity_category(_filters={}) {
        return await OpportunityCategory.find({..._filters})
        .populate({ path: 'profileId', model: 'profile' })
        .populate({ path: 'groupId', model: 'group', populate: [
            { path: 'group_manager', model: 'users' }
        ]})
    }
}

module.exports = new OpportunityCategoryServices();