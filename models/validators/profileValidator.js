
const validator = require('yup');

const profileValidator = validator.object().shape({
    username: validator.string().optional(),
    email: validator.string().email().optional(),
    phone: validator.string().optional(),
    date_created: validator.string().optional(),
    last_login: validator.string().optional(),
    roleId: validator.string().optional(),
    groupId: validator.string().optional(),
});

const profileUpdateValidator = validator.object().shape({
    id: validator.string().required(),
    username: validator.string().optional(),
    email: validator.string().email().optional(),
    phone: validator.string().optional(),
    date_created: validator.string().optional(),
    last_login: validator.string().optional(),
    roleId: validator.string().optional(),
});

const profileDeleteValidator = validator.object().shape({
    id: validator.string().required(),
});

module.exports = {
    profileValidator,
    profileUpdateValidator,
    profileDeleteValidator
};