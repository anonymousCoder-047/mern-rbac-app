
const validator = require('yup');

const permissionsValidator = validator.object().shape({
    action: validator.array().required(),
    profileId: validator.string().required(),
});

const permissionsUpdateValidator = validator.object().shape({
    id: validator.array().required(),
    action: validator.array().required(),
    profileId: validator.string().required(),
});

const permissionsDeleteValidator = validator.object().shape({
    id: validator.array().required()
});

module.exports = {
    permissionsValidator,
    permissionsUpdateValidator,
    permissionsDeleteValidator
};