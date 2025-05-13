
// loading user model
const { Source } = require('../models/Source');
const { ObjectId } = require("mongodb");

class SourceServices {
    async create(_source) {
        return await Source.create(_source);
    }

    async update_source(_source_id, _source) {
        return await Source.findOneAndUpdate({ _id: typeof _source_id == 'object' ? _source_id : ObjectId.createFromHexString(_source_id) }, { $set: _source });
    }

    async delete_source(_source_id) {
        return await Source.deleteOne({ _id: typeof _source_id == 'object' ? _source_id : ObjectId.createFromHexString(_source_id) });
    }

    async delete_Many(_filters={}) {
        return await Source.deleteMany({..._filters});
    }

    async get_source_by_id(_source_id) {
        return await Source.findById({ _id: typeof _source_id == 'object' ? _source_id : ObjectId.createFromHexString(_source_id) });
    }

    async get_source(_filters={}) {
        return await Source.find({..._filters});
    }
}

module.exports = new SourceServices();