
// load dependencies
const _ = require('lodash');

// loading validators

const { canCreate, canRead, canUpdate, canDelete } = require('../middlewares/permissionMiddleware');

// loading database service
const { getNextSequence } = require('../helpers/incrementCount');
const { create, delete_sub_type, get_sub_type, get_sub_type_by_id, update_sub_type } = require('../services/subTypeServices');

const apiResponse = require('../helpers/apiResponse');
const expressRouter = require('express');
const app = expressRouter.Router();

// load configuration variables

app.get('/view', canRead('read'), async (req, res) => {
    const sub_type_data = await get_sub_type({});

    if(!_.isEmpty(sub_type_data)) return apiResponse.successResponseWithData(res, "Sub Type information", sub_type_data);
    else return apiResponse.ErrorResponse(res, "Sorry, no Sub Type data exists");
});

app.post('/create', canCreate('create'), async (req, res) => {
    let sub_type_data = req.body;

    if(!_.isEmpty(sub_type_data)) {
        const [_existing_sub_type] = await get_sub_type({ sub_type_code: sub_type_data?.sub_type_code });
        if(_.isEmpty(_existing_sub_type)) { 
            sub_type_data['id'] = await getNextSequence('sub_type');
            const _new_sub_type = await create(sub_type_data);
    
            if(!_.isEmpty(_new_sub_type)) return apiResponse.successResponseWithData(res, "New Sub Type Created Successfully.", _new_sub_type);
            else apiResponse.ErrorResponse(res, "Unable to create new sub type.");
        } else apiResponse.ErrorResponse(res, "Sub Type already exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", sub_type_data);
});

app.post('/update', canUpdate('update'), async (req, res) => {
    const sub_type_data = req.body;

    if(!_.isEmpty(sub_type_data)) {
        const _existing_sub_type = await get_sub_type_by_id(sub_type_data?.id);
        if(!_.isEmpty(_existing_sub_type)) {
            const _updated_sub_type = await update_sub_type(sub_type_data?.id, _.omit(sub_type_data, ['id']));
    
            if(!_.isEmpty(_updated_sub_type)) return apiResponse.successResponseWithData(res, "Sub Type Updated Successfully.", _updated_sub_type);
            else apiResponse.ErrorResponse(res, "Unable to update sub type.");
        } else apiResponse.ErrorResponse(res, "Sub Type doesnot exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", sub_type_data);
});

app.patch('/update/:id', canUpdate('update'), async (req, res) => {
    const sub_type_id = req.params.id;
    const sub_type_data = req.body;

    if(!_.isEmpty(sub_type_data) && sub_type_id != "") {
        const _existing_sub_type = await get_sub_type_by_id(sub_type_id);
        if(!_.isEmpty(_existing_sub_type)) {
            const _updated_sub_type = await update_sub_type(sub_type_id, _.omit(sub_type_data, ['id']));
    
            if(!_.isEmpty(_updated_sub_type)) return apiResponse.successResponseWithData(res, "Sub Type Updated Successfully.", _updated_sub_type);
            else apiResponse.ErrorResponse(res, "Unable to update sub type.");
        } else apiResponse.ErrorResponse(res, "Sub Type doesnot exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", sub_type_data);
});

app.post('/delete', canDelete('delete'), async (req, res) => {
    const sub_type_data = req.body;

    if(!_.isEmpty(sub_type_data)) {
        const _existing_sub_type = await get_sub_type_by_id(sub_type_data?.id);
        if(!_.isEmpty(_existing_sub_type)) {
            const _deleted_sub_type = await delete_sub_type(sub_type_data?.id);
    
            if(!_.isEmpty(_deleted_sub_type)) return apiResponse.successResponseWithData(res, "Sub Type Deleted Successfully.", _deleted_sub_type);
            else apiResponse.ErrorResponse(res, "Unable to delete sub type.");
        } else apiResponse.ErrorResponse(res, "Sub Type doesnot exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", sub_type_data);
});

module.exports.subTypeController = app;