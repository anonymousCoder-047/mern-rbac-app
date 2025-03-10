
// load modules
const { 
    resetPasswordValidator, 
    forgotPasswordValidator,
    emailValidator,
    OTPValidator
} = require('../models/validators/resetPasswordValidator');
const loginValidator = require("../models/validators/loginValidator").loginValidatorSchema;
const signupValidator = require('../models/validators/signupValidator').signupValidatorSchema;

const {
    groupValidator,
    groupUpdateValidator,
    groupDeleteValidator
} = require('../models/validators/groupValidator');

const {
    profileValidator,
    profileUpdateValidator,
    profileDeleteValidator
} = require('../models/validators/profileValidator');

const {
    permissionsValidator,
    permissionsUpdateValidator,
    permissionsDeleteValidator,
} = require('../models/validators/permissionsValidator');

const {
    roleValidator,
    roleUpdateValidator,
    roleDeleteValidator,
} = require('../models/validators/roleValidator');

const apiResponse = require('../helpers/apiResponse');


/**
 * 
 * Auth Validators
 * 
 */

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

async function validateLogin(req, res, next) {
    try {
        req.body = await loginValidator.validate(req.body);
        next();
    } catch(error) {
        return apiResponse.badRequestResponse(res, "Bad request E: " + error, {})
    }
}

async function validateSignup(req, res, next) {
    try {
        req.body = await signupValidator.validate(req.body);
        next();
    } catch(error) {
        return apiResponse.badRequestResponse(res, "Bad request E: " + error, {})
    }
}

/**
 * 
 * Group Validators
 * 
 */

async function validateCreateGroup(req, res, next) {
    try {
        req.body = await groupValidator.validate(req.body);
        next();
    } catch(error) {
        return apiResponse.badRequestResponse(res, "Bad request E: " + error, {})
    }
}

async function validateUpdateGroup(req, res, next) {
    try {
        req.body = await groupUpdateValidator.validate(req.body);
        next();
    } catch(error) {
        return apiResponse.badRequestResponse(res, "Bad request E: " + error, {})
    }
}

async function validateDeleteGroup(req, res, next) {
    try {
        req.body = await groupDeleteValidator.validate(req.body);
        next();
    } catch(error) {
        return apiResponse.badRequestResponse(res, "Bad request E: " + error, {})
    }
}

/**
 * 
 * Profile Validators
 * 
 */

async function validateCreateProfile(req, res, next) {
    try {
        req.body = await profileValidator.validate(req.body);
        next();
    } catch(error) {
        return apiResponse.badRequestResponse(res, "Bad request E: " + error, {})
    }
}

async function validateUpdateProfile(req, res, next) {
    try {
        req.body = await profileUpdateValidator.validate(req.body);
        next();
    } catch(error) {
        return apiResponse.badRequestResponse(res, "Bad request E: " + error, {})
    }
}

async function validateDeleteProfile(req, res, next) {
    try {
        req.body = await profileDeleteValidator.validate(req.body);
        next();
    } catch(error) {
        return apiResponse.badRequestResponse(res, "Bad request E: " + error, {})
    }
}

/**
 * 
 * Permissions Validators
 * 
 */

async function validateCreatePermissions(req, res, next) {
    try {
        req.body = await permissionsValidator.validate(req.body);
        next();
    } catch(error) {
        return apiResponse.badRequestResponse(res, "Bad request E: " + error, {})
    }
}

async function validateUpdatePermissions(req, res, next) {
    try {
        req.body = await permissionsUpdateValidator.validate(req.body);
        next();
    } catch(error) {
        return apiResponse.badRequestResponse(res, "Bad request E: " + error, {})
    }
}

async function validateDeletePermissions(req, res, next) {
    try {
        req.body = await permissionsDeleteValidator.validate(req.body);
        next();
    } catch(error) {
        return apiResponse.badRequestResponse(res, "Bad request E: " + error, {})
    }
}

/**
 * 
 * Role Validators
 * 
 */

async function validateCreateRole(req, res, next) {
    try {
        req.body = await roleValidator.validate(req.body);
        next();
    } catch(error) {
        return apiResponse.badRequestResponse(res, "Bad request E: " + error, {})
    }
}

async function validateUpdateRole(req, res, next) {
    try {
        req.body = await roleUpdateValidator.validate(req.body);
        next();
    } catch(error) {
        return apiResponse.badRequestResponse(res, "Bad request E: " + error, {})
    }
}

async function validateDeleteRole(req, res, next) {
    try {
        req.body = await roleDeleteValidator.validate(req.body);
        next();
    } catch(error) {
        return apiResponse.badRequestResponse(res, "Bad request E: " + error, {})
    }
}

module.exports = {
    resetPasswordValidator: validateResetPassword,
    forgotPasswordValidator: validateForgotPassword,
    validateEmailLink: validateEmailLink,
    validateOTPData: validateOTPData,
    validateLogin,
    validateSignup,
    validateCreateGroup,
    validateUpdateGroup,
    validateDeleteGroup,
    validateCreateProfile,
    validateUpdateProfile,
    validateDeleteProfile,
    validateCreatePermissions,
    validateUpdatePermissions,
    validateDeletePermissions,
    validateCreateRole,
    validateUpdateRole,
    validateDeleteRole,
};