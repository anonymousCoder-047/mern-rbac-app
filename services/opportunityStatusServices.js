
// loading user model
const { OpportunityStatus } = require('../models/OppotunityStatus');
const { ObjectId } = require("mongodb");

class OpportunityStatusServices {
    async create(_opportunity_status) {
        return await OpportunityStatus.create(_opportunity_status);
    }

    async update_opportunity_status(_opportunity_status_id, _opportunity_status) {
        return await OpportunityStatus.findOneAndUpdate({ _id: typeof _opportunity_status_id == 'object' ? _opportunity_status_id : ObjectId.createFromHexString(_opportunity_status_id) }, { $set: _opportunity_status });
    }

    async delete_opportunity_status(_opportunity_status_id) {
        return await OpportunityStatus.deleteOne({ _id: typeof _opportunity_status_id == 'object' ? _opportunity_status_id : ObjectId.createFromHexString(_opportunity_status_id) });
    }

    async delete_Many(_filters={}) {
        return await OpportunityStatus.deleteMany({..._filters});
    }

    async get_opportunity_status_by_id(_opportunity_status_id) {
        return await OpportunityStatus.findById({ _id: typeof _opportunity_status_id == 'object' ? _opportunity_status_id : ObjectId.createFromHexString(_opportunity_status_id) });
    }

    async get_opportunity_status(_filters={}) {
        return await OpportunityStatus.find({..._filters})
        .populate({ path: 'profileId', model: 'profile' })
        .populate({ path: 'groupId', model: 'group', populate: [
            { path: 'group_manager', model: 'users' }
        ]})
    }
}

module.exports = new OpportunityStatusServices();