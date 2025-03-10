
// load dependencies
const path = require('path');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

// load validator middleware
const { userLogin } = require('../middlewares/authMiddleware');
const { generateAccessToken, generateRefreshToken } = require('../helpers/generateToken');
const { 
    resetPasswordValidator, 
    forgotPasswordValidator,
    validateEmailLink,
    validateOTPData,
    validateSignup,
    validateLogin
} = require('../middlewares/validatorMiddleware');

// loading database service
const { getNextSequence } = require('../helpers/incrementCount');
const { create, get_users, get_user_by_id } = require('../services/userServices');
const { create:createProfile } = require('../services/profileServices');

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
    otp_expiry_time,
    access_token_secret,
    refresh_token_secret,
} = require("../config/config");

app.post('/signup', validateSignup, async (req, res) => {
    try {
        let user_data = req.body;
        const _existing_usr = user_data?.username ? await get_users({ username: user_data.username }) : await get_users({ email: user_data.email });;
        const hashedPassword = await bcrypt.hash(user_data.password, 10);
        
        user_data['id'] = await getNextSequence('users');
        user_data.password = hashedPassword;
        
        if(!_.isEmpty(_existing_usr)) return apiResponse.ErrorResponse(res, "Sorry! user already exist! please login.");  
        
        let _profileData = {
            username: user_data?.username ?? "",
            email: user_data?.email ?? "",
        }
        _profileData['id'] = await getNextSequence('profile');
        const _profile = await createProfile(_profileData);

        user_data['profileId'] = _profile?._id;

        const _accessToken = generateAccessToken(user_data);
        const _refreshToken = generateRefreshToken(user_data);
        let _new_usr = await create(user_data);
        const _usrData = { ..._new_usr?._doc, 'token': _accessToken };

        res.cookie('refresh_token', _refreshToken, { httpOnly: true, secure: true, sameSite: 'none' });
        return apiResponse.successResponseWithData(res, "User signed up successfully.", _usrData);
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

            const _mail_info = await send_mail("forgot_password", emailData, mail_username, _existing_usr[0]?.email, "Reset Password", _attachments)

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
        
        const _accessToken = generateAccessToken(user_data);
        const _refreshtoken = generateRefreshToken(user_data);
        let _updated_usr = await update(user_data);
        const _usrData = { ..._updated_usr?._doc, 'token': _accessToken };

        res.cookie('refresh_token', _refreshtoken, { httpOnly: true, secure: true, sameSite: 'none' });
        return apiResponse.successResponseWithData(res, "User signed up successfully.", _usrData);
    } catch(error) {
        return apiResponse.ErrorResponse(res, "Sorry! something went wrong while process signup E: " + error);
    }
})

app.post('/login', validateLogin, userLogin, async (req, res) => {
    try {
        const { username } = req.body;
        let _query_field_name = username.includes('@') ? 'email' : 'username';
        const [ _existing_usr ] = await get_users({ [_query_field_name]: username })

        if(_.isEmpty(_existing_usr)) return apiResponse.ErrorResponse(res, "Sorry! user does not exist! please signup.");
        const _accessToken = generateAccessToken(_existing_usr);
        const _refreshToken = generateRefreshToken(_existing_usr);
        const _usrData = { ..._existing_usr?._doc, 'token': _accessToken };

        res.cookie('refresh_token', _refreshToken, { httpOnly: true, secure: true, sameSite: 'none' });
        return apiResponse.successResponseWithData(res, "User logged in successfully!", _usrData);
    } catch(e) {
        return apiResponse.ErrorResponse(res, "Sorry! something went wrong while logging in E: "+ e);
    }
})

app.post('/refresh-token', async (req, res) => {
    const { refresh_token } = req.cookies;
    if(!refresh_token) return apiResponse.unauthorizedResponse(res, "Unauthorized! please login.");
    else {
        try {
            const { exp } = jwt.decode(refresh_token);

            if(exp < Date.now().valueOf() / 1000) return apiResponse.unauthorizedResponse(res, "Token expired");
            else {
                const payload = jwt.verify(refresh_token, refresh_token_secret);
                console.log("Payload -- ", payload);
                const _accessToken = generateAccessToken(payload);
              
                return apiResponse.successResponseWithData(res, "Token refreshed successfully", { "accessToken": _accessToken });
            }
        } catch(e) {
            return apiResponse.ErrorResponse(res, "Sorry! something went wrong while refreshing token E: "+ e);
        }
    }
})

app.post('/logout', (req, res) => {
    return apiResponse.successResponse(res, "Logout successful.");
})

app.get('/session-active', async (req, res) => {
    try {
        const { authorization } = req.headers;
        const _token = authorization?.split(' ')[1]; 
        const payload = jwt.verify(_token, access_token_secret);
        
        if(payload) {
            const _existing_user = await get_user_by_id(payload?._id);
            
            if(_.isEmpty(_existing_user)) return apiResponse.ErrorResponse(res, "Incorrect Token!");
            else return apiResponse.successResponse(res, _token);
        } else return apiResponse.ErrorResponse(res, "Please login.");
    } catch (err) {
        return apiResponse.ErrorResponse(res, "Invalid token");
    }
});

module.exports.authController = app;