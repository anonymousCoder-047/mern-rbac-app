
// load dependencies
const _ = require('lodash');

// loading validators

const { canCreate, canRead, canUpdate, canDelete } = require('../middlewares/permissionMiddleware');

// loading database service
const { getNextSequence } = require('../helpers/incrementCount');
const { create, delete_source, get_source, get_source_by_id, update_source } = require('../services/sourceServices');

const apiResponse = require('../helpers/apiResponse');
const expressRouter = require('express');
const app = expressRouter.Router();

// load configuration variables

app.get('/view', canRead('read'), async (req, res) => {
    const source_data = await get_source({});

    if(!_.isEmpty(source_data)) return apiResponse.successResponseWithData(res, "Source information", source_data);
    else return apiResponse.ErrorResponse(res, "Sorry, no Source data exists");
});

app.post('/create', canCreate('create'), async (req, res) => {
    let source_data = req.body;

    if(!_.isEmpty(source_data)) {
        const [_existing_source] = await get_source({ source_name: source_data?.source_name });
        if(_.isEmpty(_existing_source)) { 
            source_data['id'] = await getNextSequence('source');
            const _new_source = await create(source_data);
    
            if(!_.isEmpty(_new_source)) return apiResponse.successResponseWithData(res, "New Source Created Successfully.", _new_source);
            else apiResponse.ErrorResponse(res, "Unable to create new source.");
        } else apiResponse.ErrorResponse(res, "Source already exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", source_data);
});

app.post('/update', canUpdate('update'), async (req, res) => {
    const source_data = req.body;

    if(!_.isEmpty(source_data)) {
        const _existing_source = await get_source_by_id(source_data?.id);
        if(!_.isEmpty(_existing_source)) {
            const _updated_source = await update_source(source_data?.id, _.omit(source_data, ['id']));
    
            if(!_.isEmpty(_updated_source)) return apiResponse.successResponseWithData(res, "Source Updated Successfully.", _updated_source);
            else apiResponse.ErrorResponse(res, "Unable to update source.");
        } else apiResponse.ErrorResponse(res, "Source doesnot exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", source_data);
});

app.patch('/update/:id', canUpdate('update'), async (req, res) => {
    const source_id = req.params.id;
    const source_data = req.body;

    if(!_.isEmpty(source_data) && source_id != "") {
        const _existing_source = await get_source_by_id(source_id);
        if(!_.isEmpty(_existing_source)) {            
            const _updated_source = await update_source(source_id, _.omit(source_data, ['id']));
    
            if(!_.isEmpty(_updated_source)) return apiResponse.successResponseWithData(res, "Source Updated Successfully.", _updated_source);
            else apiResponse.ErrorResponse(res, "Unable to update source.");
        } else apiResponse.ErrorResponse(res, "Source doesnot exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", source_data);
});

app.post('/delete', canDelete('delete'), async (req, res) => {
    const source_data = req.body;

    if(!_.isEmpty(source_data)) {
        const _existing_source = await get_source_by_id(source_data?.id);
        if(!_.isEmpty(_existing_source)) {
            const _deleted_source = await delete_source(source_data?.id);
    
            if(!_.isEmpty(_deleted_source)) return apiResponse.successResponseWithData(res, "Source Deleted Successfully.", _deleted_source);
            else apiResponse.ErrorResponse(res, "Unable to delete source.");
        } else apiResponse.ErrorResponse(res, "Source doesnot exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", source_data);
});

module.exports.sourceController = app;