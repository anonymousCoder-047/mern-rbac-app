
const validator = require('yup');

const resetPasswordValidator = validator.object().shape({
    username: validator.string(),
    email: validator.string().email(),
    password: validator.string().min(8).max(12).required(),
    confirmPassword: validator.string().min(8).max(12).required()
});

const forgotPasswordValidator = validator.object().shape({
    username: validator.string().required(),
    email: validator.string().email()
});

const emailValidator = validator.object().shape({
    link: validator.string().required()
});

const OTPValidator = validator.object().shape({
    type: validator.string().required(),
    code: validator.string().required(),
    user_id: validator.string().required()
});

module.exports = {
    resetPasswordValidator: resetPasswordValidator,
    forgotPasswordValidator: forgotPasswordValidator,
    emailValidator: emailValidator,
    OTPValidator: OTPValidator
}