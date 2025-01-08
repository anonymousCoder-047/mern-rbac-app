
const validator = require('yup');

const loginValidator = validator.object().shape({
    username: validator.string().optional(),
    email: validator.string().email().optional(),
    password: validator.string().required()
});

module.exports.loginValidatorSchema = loginValidator;