
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const OpportunitySubCategorySchema = mongoose.Schema({
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
    opportunity_sub_type_name: {
        type: String,
        required: false,
        default: ""
    },
    mrc: {
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

module.exports.OpportunitySubCategory = new mongoose.model('opportunity_sub_category', OpportunitySubCategorySchema, 'opportunity_sub_category');