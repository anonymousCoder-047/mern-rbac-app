
// load modules
const signupValidator = require('../models/validators/signupValidator').signupValidatorSchema;
const apiResponse = require('../helpers/apiResponse');

async function validateSignup(req, res, next) {
    try {
        req.body = await signupValidator.validate(req.body);
        next();
    } catch(error) {
        return apiResponse.badRequestResponse(res, "Bad request E: " + error, {})
    }
}

module.exports = validateSignup;