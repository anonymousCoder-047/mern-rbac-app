
// load modules
const { 
    resetPasswordValidator, 
    forgotPasswordValidator,
    emailValidator,
    OTPValidator
} = require('../models/validators/resetPasswordValidator');
const apiResponse = require('../helpers/apiResponse');

async function validateResetPassword(req, res, next) {
    try {
        req.body = await resetPasswordValidator.validate(req.body);
        next();
    } catch(error) {
        return apiResponse.badRequestResponse(res, "Bad request E: " + error, {})
    }
}

async function validateForgotPassword(req, res, next) {
    try {
        req.body = await forgotPasswordValidator.validate(req.body);
        next();
    } catch(error) {
        return apiResponse.badRequestResponse(res, "Bad request E: " + error, {})
    }
}

async function validateEmailLink(req, res, next) {
    try {
        req.body = await emailValidator.validate(req.body);
        next();
    } catch(error) {
        return apiResponse.badRequestResponse(res, "Bad request E: " + error, {})
    }
}

async function validateOTPData(req, res, next) {
    try {
        req.body = await OTPValidator.validate(req.body);
        next();
    } catch(error) {
        return apiResponse.badRequestResponse(res, "Bad request E: " + error, {})
    }
}

module.exports = {
    resetPasswordValidator: validateResetPassword,
    forgotPasswordValidator: validateForgotPassword,
    validateEmailLink: validateEmailLink,
    validateOTPData: validateOTPData
};