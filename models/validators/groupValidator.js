
const validator = require('yup');

const groupValidator = validator.object().shape({
    group_name: validator.string().required(),
    alias: validator.string().required(),
    group_manager: validator.string().optional(),
    group_description: validator.string().required(),
    group_members: validator.array().optional(),
});

const groupUpdateValidator = validator.object().shape({
    id: validator.string().required(),
    group_name: validator.string().optional(),
    alias: validator.string().optional(),
    group_manager: validator.string().optional(),
    group_description: validator.string().optional(),
    group_members: validator.array().optional(),
});

const groupDeleteValidator = validator.object().shape({
    id: validator.string().required()
});

module.exports = {
    groupValidator,
    groupUpdateValidator,
    groupDeleteValidator
};