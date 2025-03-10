
// load dependencies
const _ = require('lodash');

// loading validators
const {
    validateCreateRole,
    validateUpdateRole,
    validateDeleteRole
} = require('../middlewares/validatorMiddleware');

// loading database service
const { getNextSequence } = require('../helpers/incrementCount');
const { create, get_role, get_role_by_id, update_role, delete_role } = require('../services/roleServices');

const apiResponse = require('../helpers/apiResponse');
const expressRouter = require('express');
const app = expressRouter.Router();

// load configuration variables

app.get('/view', async (req, res) => {
    const role_data = await get_role({});

    if(!_.isEmpty(role_data)) return apiResponse.successResponseWithData(res, "Role information", role_data);
    else return apiResponse.ErrorResponse(res, "Sorry, no Role data exists");
});

app.post('/create', validateCreateRole, async (req, res) => {
    let role_data = req.body;

    if(!_.isEmpty(role_data)) {
        const _existing_role = await get_role_by_id(role_data?.id);
        if(_.isEmpty(_existing_role)) { 
            role_data['id'] = await getNextSequence('role');
            const _new_role = await create(role_data);
    
            if(!_.isEmpty(_new_role)) return apiResponse.successResponseWithData(res, "New Role Created Successfully.", _new_role);
            else apiResponse.ErrorResponse(res, "Unable to create new role.");
        } else apiResponse.ErrorResponse(res, "Role already exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", role_data);
});

app.post('/update', validateUpdateRole, async (req, res) => {
    try {
        const role_data = req.body;
    
        if(!_.isEmpty(role_data)) {
            const _existing_role = await get_role_by_id(role_data?.id);
            if(!_.isEmpty(_existing_role)) {
                const _updated_role = await update_role(role_data?.id, _.omit(role_data, ['id']));
        
                if(!_.isEmpty(_updated_role)) return apiResponse.successResponseWithData(res, "Role Updated Successfully.", _updated_role);
                else apiResponse.ErrorResponse(res, "Unable to update role.");
            } else apiResponse.ErrorResponse(res, "Role doesnot exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", role_data);
    } catch(ex) {
        return apiResponse.ErrorResponse(res, "Error something went wrong E: ", ex);
    }
});

app.patch('/update/:id', async (req, res) => {
    try {
        const role_id = req.params.id;
        const role_data = req.body;
    
        if(!_.isEmpty(role_data) && role_id != "") {
            const _existing_role = await get_role_by_id(role_id);
            if(!_.isEmpty(_existing_role)) {
                const _updated_role = await update_role(role_id, _.omit(role_data, ['id']));
        
                if(!_.isEmpty(_updated_role)) return apiResponse.successResponseWithData(res, "Role Updated Successfully.", _updated_role);
                else apiResponse.ErrorResponse(res, "Unable to update role.");
            } else apiResponse.ErrorResponse(res, "Role doesnot exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", role_data);
    } catch(ex) {
        return apiResponse.ErrorResponse(res, "Error something went wrong E: ", ex);
    }
});

app.post('/delete', validateDeleteRole, async (req, res) => {
    const role_data = req.body;

    if(!_.isEmpty(role_data)) {
        const _existing_role = await get_role_by_id(role_data?.id);
        if(!_.isEmpty(_existing_role)) {
            const _deleted_role = await delete_role(role_data?.id);
    
            if(!_.isEmpty(_deleted_role)) return apiResponse.successResponseWithData(res, "Role Deleted Successfully.", _deleted_role);
            else apiResponse.ErrorResponse(res, "Unable to delete role.");
        } else apiResponse.ErrorResponse(res, "Role doesnot exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", role_data);
});

module.exports.roleController = app;