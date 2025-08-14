
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const moment = require('moment');

const sourceSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        default: 0
    },
    source_name: {
        type: String,
        default: "",
        required: false
    },
    created_date: {
        type: String,
        default: moment(new Date()).format('YYYY-MM-DD'),
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

module.exports.Source = new mongoose.model('source', sourceSchema, 'source');