
const moment = require('moment')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const pipelineSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        default: 0
    },
    opportunity_name: {
        type: String,
        required: true,
        default: ""
    },
    start_date: {
        type: Date,
        required: false,
        default: moment(new Date()).format()
    },
    updated_date: {
        type: Date,
        required: false,
        default: moment(new Date()).add(14, 'days').format()
    },
    contact_name: {
        type: String,
        required: false,
        default: ""
    },
    company_name: {
        type: String,
        required: false,
        default: ""
    },
    sr_type: {
        type: String,
        required: false,
        default: ""
    },
    product_category: {
        type: ObjectId,
        required: false,
    },
    closing_date: {
        type: Date,
        required: false,
        default: moment(new Date()).add(14, 'days').format()
    },
    stage: {
        type: String,
        required: false,
        default: ""
    },
    amount: {
        type: mongoose.Schema.Types.Double,
        required: false,
        default: 0.0
    },
    team_leader: {
        type: ObjectId,
        required: false,
    },
    comments: {
        type: String,
        required: false,
        default: ""
    },
    last_contact_date: {
        type: Date,
        required: false,
        default: moment(new Date()).add(7, 'days').format()
    },
    order_number: {
        type: String,
        required: false,
        default: ""
    },
    pid: {
        type: Number,
        required: false,
        default: ""
    },
    custom_fields: {
        type: Object,
        required: false,
        default: {}
    },
});

module.exports.Pipeline = new mongoose.model('pipeline', pipelineSchema, 'pipeline');