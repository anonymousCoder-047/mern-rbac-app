
// loading user model
const { SRType } = require('../models/SRType');
const { ObjectId } = require("mongodb");

class SRTypeServices {
    async create(_sr_type) {
        return await SRType.create(_sr_type);
    }

    async update_sr_type(_sr_type_id, _sr_type) {
        return await SRType.findOneAndUpdate({ _id: typeof _sr_type_id == 'object' ? _sr_type_id : ObjectId.createFromHexString(_sr_type_id) }, { $set: _sr_type });
    }

    async delete_sr_type(_sr_type_id) {
        return await SRType.deleteOne({ _id: typeof _sr_type_id == 'object' ? _sr_type_id : ObjectId.createFromHexString(_sr_type_id) });
    }

    async delete_Many(_filters={}) {
        return await SRType.deleteMany({..._filters});
    }

    async get_sr_type_by_id(_sr_type_id) {
        return await SRType.findById({ _id: typeof _sr_type_id == 'object' ? _sr_type_id : ObjectId.createFromHexString(_sr_type_id) });
    }

    async get_sr_type(_filters={}) {
        return await SRType.find({..._filters})
        .populate({ path: 'profileId', model: 'profile' })
        .populate({ path: 'groupId', model: 'group', populate: [
            { path: 'group_manager', model: 'users' }
        ]})
    }
}

module.exports = new SRTypeServices();