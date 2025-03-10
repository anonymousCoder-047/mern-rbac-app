
// loading user model
const { Permissions } = require('../models/Permissions');
const { ObjectId } = require("mongodb");

class PermissionsServices {
    async create(_permissions) {
        return await Permissions.create(_permissions);
    }

    async update_permissions(_permissions_id, _permissions) {
        return await Permissions.findOneAndUpdate({ _id: typeof _permissions_id == 'object' ? _permissions_id : ObjectId.createFromHexString(_permissions_id) }, { $set: _permissions });
    }

    async delete_permissions(_permissions_id) {
        return await Permissions.deleteOne({ _id: typeof _permissions_id == 'object' ? _permissions_id : ObjectId.createFromHexString(_permissions_id) });
    }

    async get_permissions_by_id(_permissions_id) {
        return await Permissions.findById({ _id: typeof _permissions_id == 'object' ? _permissions_id : ObjectId.createFromHexString(_permissions_id) });
    }

    async get_permissions(_filters={}) {
        return await Permissions.find({..._filters});
    }
    
    async get_permissions_by_group_id(_filters={}) {
        return await Permissions.find({..._filters}).populate({ path: "groupId", model: 'group' });
    }
}

module.exports = new PermissionsServices();