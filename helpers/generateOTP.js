
// load dependencies
const _ = require('lodash');
const crypto = require('crypto');
const moment = require('moment');

// loading database service
const { getNextSequence } = require("../helpers/incrementCount");
const { create, get_OTP, delete_Many } = require('../services/otpServices');
const { get_user_by_id, get_users } = require('../services/userServices');

// load configuration variables
let { otp_length, otp_expiry_time } = require('../config/config');

const genEMAILOTP = () => {
    let otp = '';
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < otp_length; i++) {
        const randomIndex = crypto.getRandomValues(new Uint32Array(1))[0] % charset.length;
        otp += charset[randomIndex];
    }

    return otp;
}

const genSMSOTP = () => {
    let otp = '';
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < otp_length; i++) {
        const randomIndex = crypto.getRandomValues(new Uint32Array(1))[0] % charset.length;
        otp += charset[randomIndex];
    }

    return otp;
}

const generateOTP = async (_usr_id) => {
    try {
        const _otp = {
            id: 0,
            mail_otp: genEMAILOTP(),
            sms_otp: genSMSOTP(),
            auth_code: "",
            user_id: _usr_id,
            expiry: moment(new Date()).add(otp_expiry_time, 'minutes').format('YYYY/MM/DD h:mm:ss a')
        }

        _otp['id'] = await getNextSequence('otp');
        const _otp_detials = await get_OTP({ user_id: _usr_id });
        
        if(!_.isEmpty(_otp_detials)) {
            await delete_Many({ user_id: _usr_id })
        }

        const _otp_data = await create(_otp);
    
        return _otp_data;
    } catch(ex) {
        console.log("Sorry! something went wrong while generating otp E: ", ex);

        return {};
    }
}

const validateOTP = async (_type, usr_email, _otp) => {
    try {
        // const [_usr] = usr_email != "" ? await get_users({ email: usr_email }) : {};
        const _otp_type = {
            mail: "mail_otp",
            sms: "sms_otp",
            auth_code: "auth_code"
        }
    
        const _otp_key = _type ? _otp_type[_type] : _otp_type.mail;
        
        // if(_.isEmpty(_usr)) return { "status": 400, "message": "User doesnt exist! please signup." };
        
        const _otp_detials = await get_OTP({ [_otp_key]: _otp });
    
        if(_.isEmpty(_otp_detials?.[0])) return { "status": 400, "message": "Sorry! unable to verify OTP." };
        
        if(_otp === _otp_detials[0]?.[_otp_key] && moment(_otp_detials[0]?.expiry, 'YYYY/MM/DD h:mm:ss a').isAfter(moment().subtract(otp_expiry_time, 'minutes'))) return { "status": 200, "message": "OTP verified successfully.", "data": { ..._otp_detials?.[0]?._doc } }
        return { "status": 400, "message": "Sorry! incorrect OTP/Expired." };
    } catch(ex) {
        console.log("Sorry! something went wrong while validating OTP E: ", ex);

        return { "status": 500, "message": ex }
    }
}

module.exports = {
    generateOTP: generateOTP,
    validateOTP: validateOTP
}