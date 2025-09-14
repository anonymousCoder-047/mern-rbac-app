
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const moment = require('moment')

const pipelineSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        default: 0
    },
    started_date: {
        type: String,
        default: moment(new Date()).format('YYYY-MM-DD'),
        required: false
    },
    updated_date: {
        type: String,
        default: "",
        required: false
    },
    expected_closure_date: {
        type: String,
        default: "",
        required: false
    },
    pipeline_name: {
        type: String,
        default: "",
        required: false
    },
    opportunity_sub_type_name: {
        type: String,
        default: "",
        required: false
    },
    product_category: {
        type: String,
        default: "",
        required: false
    },
    product_description: {
        type: String,
        default: "",
        required: false
    },
    sr_type: {
        type: String,
        default: "",
        required: false
    },
    qty: {
        type: Number,
        default: "",
        required: false
    },
    mrc: {
        type: String,
        default: "",
        required: false
    },
    annual_rev: {
        type: String,
        default: "",
        required: false
    },
    company_name: {
        type: String,
        default: "",
        required: false
    },
    opportunity_status: {
        type: String,
        default: "",
        required: false
    },
    stage_name: {
        type: String,
        default: "",
        required: false
    },
    comments: {
        type: String,
        default: "",
        required: false
    },
    followup_date: {
        type: String,
        default: "",
        required: false
    },
    sales_id: {
        type: String,
        default: "",
        required: false
    },
    name: {
        type: String,
        default: "",
        required: false
    },
    contact_number: {
        type: String,
        default: "",
        required: false
    },
    email: {
        type: String,
        default: "",
        required: false
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

module.exports.Pipeline = new mongoose.model('pipeline', pipelineSchema, 'pipeline');