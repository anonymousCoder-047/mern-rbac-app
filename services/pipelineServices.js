
// loading user model
const { Pipeline } = require('../models/Pipeline');
const { ObjectId } = require("mongodb");

class PipelineServices {
    async create(_pipeline) {
        return await Pipeline.create(_pipeline);
    }

    async update_pipeline(_pipeline_id, _pipeline) {
        return await Pipeline.findOneAndUpdate({ _id: typeof _pipeline_id == 'object' ? _pipeline_id : ObjectId.createFromHexString(_pipeline_id) }, { $set: _pipeline });
    }

    async delete_pipeline(_pipeline_id) {
        return await Pipeline.deleteOne({ _id: typeof _pipeline_id == 'object' ? _pipeline_id : ObjectId.createFromHexString(_pipeline_id) });
    }

    async delete_Many(_filters={}) {
        return await Pipeline.deleteMany({..._filters});
    }

    async get_pipeline_by_id(_pipeline_id) {
        return await Pipeline.findById({ _id: typeof _pipeline_id == 'object' ? _pipeline_id : ObjectId.createFromHexString(_pipeline_id) })
        .populate({ path: 'product_category', model: 'category' })
        .populate({ path: 'team_leader', model: 'profile' });
    }

    async get_pipeline(_filters={}) {
        return await Pipeline.find({..._filters})
        .populate({ path: 'product_category', model: 'category' })
        .populate({ path: 'team_leader', model: 'profile' });
    }
}

module.exports = new PipelineServices();