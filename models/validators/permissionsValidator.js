
const validator = require('yup');

const permissionsValidator = validator.object().shape({
    sections: validator.array().required(),
    fields: validator.array().required(),
    attributes: validator.array().required(),
    groupId: validator.string().required(),
});

const permissionsUpdateValidator = validator.object().shape({
    id: validator.array().required(),
    sections: validator.array().optional(),
    fields: validator.array().optional(),
    attributes: validator.array().optional(),
    groupId: validator.string().optional(),
});

const permissionsDeleteValidator = validator.object().shape({
    id: validator.array().required()
});

module.exports = {
    permissionsValidator,
    permissionsUpdateValidator,
    permissionsDeleteValidator
};