
// load dependencies
const _ = require('lodash');

// loading validators
const {
    validateCreatePermissions,
    validateUpdatePermissions,
    validateDeletePermissions
} = require('../middlewares/validatorMiddleware');

// loading database service
const { getNextSequence } = require('../helpers/incrementCount');
const { create, get_permissions, get_permissions_by_id, update_permissions, delete_permissions } = require('../services/permissionsServices');

const apiResponse = require('../helpers/apiResponse');
const expressRouter = require('express');
const app = expressRouter.Router();

// load configuration variables

app.get('/view', async (req, res) => {
    const permission_data = await get_permissions({});

    if(!_.isEmpty(permission_data)) return apiResponse.successResponseWithData(res, "Permission information", permission_data);
    else return apiResponse.ErrorResponse(res, "Sorry, no Permission data exists");
});

app.post('/create', validateCreatePermissions, async (req, res) => {
    let permission_data = req.body;

    if(!_.isEmpty(permission_data)) {
        const [_existing_permission] = await get_permissions({ groupId: permission_data?.groupId });
        if(_.isEmpty(_existing_permission)) { 
            permission_data['id'] = await getNextSequence('permissions');
            const _new_permission = await create(permission_data);
    
            if(!_.isEmpty(_new_permission)) return apiResponse.successResponseWithData(res, "New Permissions Created Successfully.", _new_permission);
            else apiResponse.ErrorResponse(res, "Unable to create new permissions.");
        } else apiResponse.ErrorResponse(res, "Permissions already exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", permission_data);
});

app.post('/update', validateUpdatePermissions, async (req, res) => {
    const permission_data = req.body;

    if(!_.isEmpty(permission_data)) {
        const _existing_permission = await get_permissions_by_id(permission_data?.id);
        if(!_.isEmpty(_existing_permission)) {
            const _updated_permission = await update_permissions(permission_data?.id, _.omit(permission_data, ['id']));
    
            if(!_.isEmpty(_updated_permission)) return apiResponse.successResponseWithData(res, "Permissions Updated Successfully.", _updated_permission);
            else apiResponse.ErrorResponse(res, "Unable to update permissions.");
        } else apiResponse.ErrorResponse(res, "Permissions doesnot exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", permission_data);
});

app.patch('/update/:id', async (req, res) => {
    const permission_id = req.params.id;
    const permission_data = req.body;

    if(!_.isEmpty(permission_data) && permission_id != "") {
        const _existing_permission = await get_permissions_by_id(permission_id);
        if(!_.isEmpty(_existing_permission)) {
            const _updated_permission = await update_permissions(permission_id, _.omit(permission_data, ['id']));
    
            if(!_.isEmpty(_updated_permission)) return apiResponse.successResponseWithData(res, "Permissions Updated Successfully.", _updated_permission);
            else apiResponse.ErrorResponse(res, "Unable to update permissions.");
        } else apiResponse.ErrorResponse(res, "Permissions doesnot exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", permission_data);
});

app.post('/delete', validateDeletePermissions, async (req, res) => {
    const permission_data = req.body;

    if(!_.isEmpty(permission_data)) {
        const _existing_permission = await get_permission_by_id(permission_data?.id);
        if(!_.isEmpty(_existing_permission)) {
            const _deleted_permission = await delete_permissions(permission_data?.id);
    
            if(!_.isEmpty(_deleted_permission)) return apiResponse.successResponseWithData(res, "Permission Deleted Successfully.", _deleted_permission);
            else apiResponse.ErrorResponse(res, "Unable to delete permissions.");
        } else apiResponse.ErrorResponse(res, "Permission doesnot exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", permission_data);
});

module.exports.permissionController = app;