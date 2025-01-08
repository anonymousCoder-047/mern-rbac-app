
// load modules
const loginValidator = require('../models/validators/loginValidator').loginValidatorSchema;
const apiResponse = require('../helpers/apiResponse');

async function validateLogin(req, res, next) {
    try {
        req.body = await loginValidator.validate(req.body);
        next();
    } catch(error) {
        return apiResponse.badRequestResponse(res, "Bad request E: " + error, {})
    }
}

module.exports = validateLogin;