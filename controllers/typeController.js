
// load dependencies
const _ = require('lodash');

// loading validators

const { canCreate, canRead, canUpdate, canDelete } = require('../middlewares/permissionMiddleware');

// loading database service
const { getNextSequence } = require('../helpers/incrementCount');
const { create, update_type, delete_type, get_type, get_type_by_id } = require('../services/typeServices');

const apiResponse = require('../helpers/apiResponse');
const expressRouter = require('express');
const app = expressRouter.Router();

// load configuration variables

app.get('/view', canRead('read'), async (req, res) => {
    const type_data = await get_type({});

    if(!_.isEmpty(type_data)) return apiResponse.successResponseWithData(res, "Type information", type_data);
    else return apiResponse.ErrorResponse(res, "Sorry, no Type data exists");
});

app.post('/create', canCreate('create'), async (req, res) => {
    let type_data = req.body;

    if(!_.isEmpty(type_data)) {
        const [_existing_type] = await get_type({ type_code: type_data?.type_code });
        if(_.isEmpty(_existing_type)) { 
            type_data['id'] = await getNextSequence('type');
            const _new_type = await create(type_data);
    
            if(!_.isEmpty(_new_type)) return apiResponse.successResponseWithData(res, "New Type Created Successfully.", _new_type);
            else apiResponse.ErrorResponse(res, "Unable to create new type.");
        } else apiResponse.ErrorResponse(res, "Type already exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", type_data);
});

app.post('/update', canUpdate('update'), async (req, res) => {
    const type_data = req.body;

    if(!_.isEmpty(type_data)) {
        const _existing_type = await get_type_by_id(type_data?.id);
        if(!_.isEmpty(_existing_type)) {
            const _updated_type = await update_type(type_data?.id, _.omit(type_data, ['id']));
    
            if(!_.isEmpty(_updated_type)) return apiResponse.successResponseWithData(res, "Type Updated Successfully.", _updated_type);
            else apiResponse.ErrorResponse(res, "Unable to update type.");
        } else apiResponse.ErrorResponse(res, "Type doesnot exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", type_data);
});

app.patch('/update/:id', canUpdate('update'), async (req, res) => {
    const type_id = req.params.id;
    const type_data = req.body;

    if(!_.isEmpty(type_data) && type_id != "") {
        const _existing_type = await get_type_by_id(type_id);
        if(!_.isEmpty(_existing_type)) {
            const _updated_type = await update_type(type_id, _.omit(type_data, ['id']));
    
            if(!_.isEmpty(_updated_type)) return apiResponse.successResponseWithData(res, "Type Updated Successfully.", _updated_type);
            else apiResponse.ErrorResponse(res, "Unable to update type.");
        } else apiResponse.ErrorResponse(res, "Type doesnot exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", type_data);
});

app.post('/delete', canDelete('delete'), async (req, res) => {
    const type_data = req.body;

    if(!_.isEmpty(type_data)) {
        const _existing_type = await get_type_by_id(type_data?.id);
        if(!_.isEmpty(_existing_type)) {
            const _deleted_type = await delete_type(type_data?.id);
    
            if(!_.isEmpty(_deleted_type)) return apiResponse.successResponseWithData(res, "Type Deleted Successfully.", _deleted_type);
            else apiResponse.ErrorResponse(res, "Unable to delete type.");
        } else apiResponse.ErrorResponse(res, "Type doesnot exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", type_data);
});

module.exports.typeController = app;