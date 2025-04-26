
const validator = require('yup');

const roleValidator = validator.object().shape({
    name: validator.string().required(),
    role_id: validator.number().required(),
});

const roleUpdateValidator = validator.object().shape({
    id: validator.string().required(),
    name: validator.string().optional(),
    role_id: validator.number().optional(),
});

const roleDeleteValidator = validator.object().shape({
    id: validator.string().required()
});

module.exports = {
    roleValidator,
    roleUpdateValidator,
    roleDeleteValidator
};