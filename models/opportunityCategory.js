
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const OpportunityCategorySchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        default: 0
    },
    opportunity_type_name: {
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

module.exports.OpportunityCategory = new mongoose.model('opportunity_category', OpportunityCategorySchema, 'opportunity_category');