
// load dependencies
const path = require('path');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

// load validator middleware
const validateuser = require('../middlewares/signupMiddleware');
const validatelogin = require('../middlewares/loginMiddleware');
const { userLogin } = require('../middlewares/authMiddleware');
const { 
    resetPasswordValidator, 
    forgotPasswordValidator,
    validateEmailLink,
    validateOTPData
} = require('../middlewares/resetPasswordValidator');

// loading database service
const { getNextSequence } = require('../helpers/incrementCount');
const { create, get_users } = require('../services/userServices');

const apiResponse = require('../helpers/apiResponse');
const expressRouter = require('express');
const app = expressRouter.Router();

// load 2-factor authentication modules
const { generateOTP, validateOTP } = require("../helpers/generateOTP");

// Load email service 
const { send_mail } = require("../helpers/mail");

// load configuration variables
const {
    domain,
    mail_username,
    otp_expiry_time
} = require("../config/config");

app.post('/signup', validateuser, async (req, res) => {
    try {
        let user_data = req.body;
        const _existing_usr = user_data?.username ? await get_users({ username: user_data.username }) : await get_users({ email: user_data.email });;
        const hashedPassword = await bcrypt.hash(user_data.password, 10);
        
        user_data['id'] = await getNextSequence('users');
        user_data.password = hashedPassword;
        
        if(!_.isEmpty(_existing_usr)) return apiResponse.ErrorResponse(res, "Sorry! user already exist! please login.");  
        
        const _new_usr = await create(user_data);
        req.session.user = _new_usr;

        return apiResponse.successResponseWithData(res, "User signed up successfully.", _new_usr);
    } catch(error) {
        return apiResponse.ErrorResponse(res, "Sorry! something went wrong while process signup E: " + error);
    }
})

app.post('/forgot-password', forgotPasswordValidator, async (req, res) => {
    try {
        let user_data = req.body;
        const _existing_usr = user_data?.username ? await get_users({ username: user_data.username }) : await get_users({ email: user_data.email });
        
        if(_.isEmpty(_existing_usr)) return apiResponse.ErrorResponse(res, "Sorry! user doesnt exist! please signup.");  
        
        const _otp = _existing_usr ? await generateOTP(_existing_usr?.[0]._id) : {};

        if(!_.isEmpty(_otp)) {
            // Generate an email tempalte and send the email.
            const emailData = {
                url: domain,
                user_name: _existing_usr[0]?.username,
                otp: _otp?.mail_otp,
                expire_minute: otp_expiry_time,
                expire_time: _otp?.expiry,
                reset_url: domain + "/forgot-password",
                support_details: "https://wa.me/971505658506?text=Hello! i need your assistance to reset password for my account."
            };

            const _attachments = [
                {
                  filename: 'the_a_team.png',
                  path: path.join(__dirname, '../public/images/the_a_team.png'), // path to the image file
                  cid: 'the_a_team_logo' // same as the cid used in the HTML img src
                }
            ]

            const _mail_info = await send_mail("forgot_password", emailData, mail_username, "anonymouscoder047@gmail.com", "Reset Password", _attachments)

            if(_mail_info.status == 200) return apiResponse.successResponseWithData(res, "OTP sent successfully.", _mail_info.messageId)
            else apiResponse.ErrorResponse(res, "Sorry! couldnt send OTP E: "+ _mail_info.status);
        } else {
            return apiResponse.ErrorResponse(res, "Sorry! couldnt generate OTP.");
        }
        
    } catch(error) {
        return apiResponse.ErrorResponse(res, "Sorry! something went wrong while processing forget password E: " + error);
    }
})

app.post('/verify-otp', validateOTPData, async (req, res) => {
    try {
        const _otp_data = req.body;
        const _otp_validation = await validateOTP(_otp_data.type, req.session.user?._id || _otp_data.user_id, _otp_data.otp);
    
        if(_.isEmpty(_otp_validation)) return apiResponse.ErrorResponse(res, "Sorry! incorrect OTP.");
    
        return apiResponse.successResponseWithData(res, "OTP Verified Successfully", _otp_validation);
    } catch(ex) {
        console.log("Error! something went wrong while validating OTP E: ", ex);

        return apiResponse.ErrorResponse(res, "Error! unable to verify OTP. Try again later");
    }
})

app.post('/email_verification', validateEmailLink, async (req, res) => {
    const _email_verification_link = req.body;
    
    return apiResponse.successResponseWithData(res, "Email Verified Successfully", _email_verification_link);
})

app.post('/reset-password', resetPasswordValidator, async (req, res) => {
    try {
        let user_data = req.body;
        const _existing_usr = user_data?.username ? await get_users({ username: user_data.username }) : await get_users({ email: user_data.email });
        const hashedPassword = await bcrypt.hash(user_data.password, 10);
        
        user_data.password = hashedPassword;
        
        if(_.isEmpty(_existing_usr)) return apiResponse.ErrorResponse(res, "Sorry! user doesnt exist! please signup.");  
        
        const _updated_usr = await update(user_data);
        req.session.user = _new_usr;

        return apiResponse.successResponseWithData(res, "User signed up successfully.", _updated_usr);
    } catch(error) {
        return apiResponse.ErrorResponse(res, "Sorry! something went wrong while process signup E: " + error);
    }
})

app.post('/login', validatelogin, userLogin, async (req, res) => {
    try {
        const { username } = req.body;
        let _query_field_name = username.includes('@') ? 'email' : 'username';
        const [ _existing_usr ] = await get_users({ [_query_field_name]: username })

        if(_.isEmpty(_existing_usr)) return apiResponse.ErrorResponse(res, "Sorry! user does not exist! please signup.");
        req.session.user = _existing_usr;
        
        return apiResponse.successResponseWithData(res, "User logged in successfully!", _existing_usr);
    } catch(e) {
        return apiResponse.ErrorResponse(res, "Sorry! something went wrong while logging in E: "+ e);
    }
})

app.post('/logout', (req, res) => {
    if(req.session.user) req.session.destroy();

    return apiResponse.successResponse(res, "Logout successful.");
})

module.exports.signupRouter = app;