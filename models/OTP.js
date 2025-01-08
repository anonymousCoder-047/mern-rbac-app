
const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId;

const otpSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        default: 0
    },
    mail_otp: {
        type: String,
        required: true,
        default: ""
    },
    sms_otp: {
        type: String,
        required: false,
        default: ""
    },
    auth_code: {
        type: String,
        required: false,
        default: ""
    },
    user_id: {
        type: objectId,
        required: true
    },
    expiry: {
        type: String,
        required: true,
        default: ""
    }
});

module.exports.OTP = new mongoose.model('otp', otpSchema, 'otp');