
// loading user model
const { Role } = require('../models/Roles');
const ObjectId = require('mongodb').ObjectId;

class RoleServices {
    async create(_role) {
        return await Role.create(_role);
    }

    async update_role(_role_id, _role) {
        return await Role.findOneAndUpdate({ _id: typeof _role_id == 'object' ? _role_id : ObjectId.createFromHexString(_role_id) }, { $set: _role });
    }

    async delete_role(_role_id) {
        return await Role.deleteOne({ _id: typeof _role_id == 'object' ? _role_id : ObjectId.createFromHexString(_role_id) });
    }

    async get_role_by_id(_role_id) {
        return await Role.findOne({ _id: typeof _role_id == 'object' ? _role_id : ObjectId.createFromHexString(_role_id) });
    }

    async get_role(_filters={}) {
        return await Role.find({..._filters});
    }
}

module.exports = new RoleServices();