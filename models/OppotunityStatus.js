
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const opportunityStatusSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        default: 0
    },
    opportunity_name: {
        type: String,
        required: false,
        default: ""
    },
    opportunity_percentage: {
        type: String,
        required: false,
        default: ""
    },
    profileId: {
        type: ObjectId,
        required: false,
    },
    groupId: {
        type: ObjectId,
        required: false
    },
});

module.exports.OpportunityStatus = new mongoose.model('opportunity_status', opportunityStatusSchema, 'opportunity_status');