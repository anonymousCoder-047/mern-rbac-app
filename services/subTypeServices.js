
// loading user model
const { SubType } = require('../models/SubType');
const { ObjectId } = require("mongodb");

class SubTypeServices {
    async create(_sub_type) {
        return await SubType.create(_sub_type);
    }
    
    async createMany(_sub_types) {
        return await SubType.insertMany(_sub_types);
    }

    async update_sub_type(_sub_type_id, _sub_type) {
        return await SubType.findOneAndUpdate({ _id: typeof _sub_type_id == 'object' ? _sub_type_id : ObjectId.createFromHexString(_sub_type_id) }, { $set: _sub_type });
    }

    async delete_sub_type(_sub_type_id) {
        return await SubType.deleteOne({ _id: typeof _sub_type_id == 'object' ? _sub_type_id : ObjectId.createFromHexString(_sub_type_id) });
    }

    async delete_Many(_filters={}) {
        return await SubType.deleteMany({..._filters});
    }

    async get_sub_type_by_id(_sub_type_id) {
        return await SubType.findById({ _id: typeof _sub_type_id == 'object' ? _sub_type_id : ObjectId.createFromHexString(_sub_type_id) });
    }

    async get_sub_type(_filters={}) {
        return await SubType.find({..._filters});
    }
}

module.exports = new SubTypeServices();