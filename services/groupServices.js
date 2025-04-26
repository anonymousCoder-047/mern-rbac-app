
// loading user model
const { Group } = require('../models/Group');
const { ObjectId } = require('mongodb');

class GroupServices {
    async create(_group) {
        return await Group.create(_group);
    }

    async update_group(_group_id, _group) {
        return await Group.findOneAndUpdate({ _id: typeof _group_id == 'object' ? _group_id : ObjectId.createFromHexString(_group_id) }, { $set: _group });
    }

    async delete_group(_group_id) {
        return await Group.deleteOne({ _id: typeof _group_id == 'object' ? _group_id : ObjectId.createFromHexString(_group_id) });
    }

    async get_group_by_id(_group_id) {
        return await Group.findOne({ _id: typeof _group_id == 'object' ? _group_id : ObjectId.createFromHexString(_group_id) }).populate({ path: "group_manager", model: "profile" }).populate({ path: "group_members", model: "profile" });
    }

    async get_group(_filters={}) {
        return await Group.find({..._filters}).populate({ path: "group_manager", model: "profile" }).populate({ path: "group_members", model: "profile" });
    }
}

module.exports = new GroupServices();