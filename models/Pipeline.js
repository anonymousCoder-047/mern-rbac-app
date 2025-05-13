
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const pipelineSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        default: 0
    },
    pipeline_name: {
        type: String,
        default: "",
        required: false
    },
    stage_name: [{
        type: String,
        default: "",
        required: false
    }],
    stage_percentage: [{
        type: String,
        default: "",
        required: false
    }],
    created_date: {
        type: String,
        default: "",
        required: false
    },
});

module.exports.Pipeline = new mongoose.model('pipeline', pipelineSchema, 'pipeline');