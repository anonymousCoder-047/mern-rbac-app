
// loading user model
const { OTP } = require('../models/OTP');

class OTPServices {
    async create(_otp) {
        return await OTP.create(_otp);
    }

    async update_OTP(_otp_id, _otp) {
        return await OTP.findOneAndUpdate({ _id: _otp_id }, { $set: _otp });
    }

    async delete_OTP(_otp_id) {
        return await OTP.deleteOne({ _id: _otp_id });
    }

    async delete_Many(_filters={}) {
        return await OTP.deleteMany({..._filters});
    }

    async get_OTP_by_id(_otp_id) {
        return await OTP.findById({ _id: _otp_id });
    }

    async get_OTP(_filters={}) {
        return await OTP.find({..._filters});
    }
}

module.exports = new OTPServices();