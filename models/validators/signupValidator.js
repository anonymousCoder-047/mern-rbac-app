
const validator = require('yup');

const singupValidator = validator.object().shape({
    username: validator.string().required(),
    email: validator.string().email().required(),
    password: validator.string().min(8).max(12).required()
});

module.exports.signupValidatorSchema = singupValidator;