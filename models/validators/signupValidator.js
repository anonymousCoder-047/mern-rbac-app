
const validator = require('yup');

const singupValidator = validator.object().shape({
    username: validator.string().optional(),
    email: validator.string().email().optional(),
    password: validator.string().min(8).max(12).required()
});

module.exports.signupValidatorSchema = singupValidator;