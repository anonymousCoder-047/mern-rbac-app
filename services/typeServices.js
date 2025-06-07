
// loading user model
const { Type } = require('../models/Type');
const { ObjectId } = require("mongodb");

class TypeServices {
    async create(_type) {
        return await Type.create(_type);
    }
    
    async createMany(_types) {
        return await Type.insertMany(_types);
    }

    async update_type(_type_id, _type) {
        return await Type.findOneAndUpdate({ _id: typeof _type_id == 'object' ? _type_id : ObjectId.createFromHexString(_type_id) }, { $set: _type });
    }

    async delete_type(_type_id) {
        return await Type.deleteOne({ _id: typeof _type_id == 'object' ? _type_id : ObjectId.createFromHexString(_type_id) });
    }

    async delete_Many(_filters={}) {
        return await Type.deleteMany({..._filters});
    }

    async get_type_by_id(_type_id) {
        return await Type.findById({ _id: typeof _type_id == 'object' ? _type_id : ObjectId.createFromHexString(_type_id) }).populate({ path: 'sub_type', model: 'sub_type' });
    }

    async get_type(_filters={}) {
        return await Type.find({..._filters}).populate({ path: 'sub_type', model: 'sub_type' });
    }
}

module.exports = new TypeServices();