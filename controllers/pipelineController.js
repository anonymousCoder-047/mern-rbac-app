
// load dependencies
const _ = require('lodash');

// loading validators

const { canCreate, canRead, canUpdate, canDelete } = require('../middlewares/permissionMiddleware');

// loading database service
const { getNextSequence } = require('../helpers/incrementCount');
const { create, delete_pipeline, get_pipeline, get_pipeline_by_id, update_pipeline } = require('../services/pipelineServices');

const apiResponse = require('../helpers/apiResponse');
const expressRouter = require('express');
const app = expressRouter.Router();

// load configuration variables

app.get('/view', canRead('read'), async (req, res) => {
    const pipeline_data = await get_pipeline({});

    if(!_.isEmpty(pipeline_data)) return apiResponse.successResponseWithData(res, "Pipeline information", pipeline_data);
    else return apiResponse.ErrorResponse(res, "Sorry, no Pipeline data exists");
});

app.post('/create', canCreate('create'), async (req, res) => {
    let pipeline_data = req.body;

    if(!_.isEmpty(pipeline_data)) {
        const [_existing_pipeline] = await get_pipeline({ pipeline_name: pipeline_data?.pipeline_name });
        if(_.isEmpty(_existing_pipeline)) { 
            pipeline_data['id'] = await getNextSequence('pipeline');
            const _new_pipeline = await create(pipeline_data);
    
            if(!_.isEmpty(_new_pipeline)) return apiResponse.successResponseWithData(res, "New Pipeline Created Successfully.", _new_pipeline);
            else apiResponse.ErrorResponse(res, "Unable to create new pipeline.");
        } else apiResponse.ErrorResponse(res, "Pipeline already exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", pipeline_data);
});

app.post('/update', canUpdate('update'), async (req, res) => {
    const pipeline_data = req.body;

    if(!_.isEmpty(pipeline_data)) {
        const _existing_pipeline = await get_pipeline_by_id(pipeline_data?.id);
        if(!_.isEmpty(_existing_pipeline)) {
            const _updated_pipeline = await updat(pipeline_data?.id, _.omit(pipeline_data, ['id']));
    
            if(!_.isEmpty(_updated_pipeline)) return apiResponse.successResponseWithData(res, "Pipeline Updated Successfully.", _updated_pipeline);
            else apiResponse.ErrorResponse(res, "Unable to update pipeline.");
        } else apiResponse.ErrorResponse(res, "Pipeline doesnot exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", pipeline_data);
});

app.patch('/update/:id', canUpdate('update'), async (req, res) => {
    const pipeline_id = req.params.id;
    const pipeline_data = req.body;

    if(!_.isEmpty(pipeline_data) && pipeline_id != "") {
        const _existing_pipeline = await get_pipeline_by_id(pipeline_id);
        if(!_.isEmpty(_existing_pipeline)) {
            const _updated_pipeline = await update_pipeline(pipeline_id, _.omit(pipeline_data, ['id']));
    
            if(!_.isEmpty(_updated_pipeline)) return apiResponse.successResponseWithData(res, "Pipeline Updated Successfully.", _updated_pipeline);
            else apiResponse.ErrorResponse(res, "Unable to update pipeline.");
        } else apiResponse.ErrorResponse(res, "Pipeline doesnot exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", pipeline_data);
});

app.post('/delete', canDelete('delete'), async (req, res) => {
    const pipeline_data = req.body;

    if(!_.isEmpty(pipeline_data)) {
        const _existing_pipeline = await get_pipeline_by_id(pipeline_data?.id);
        if(!_.isEmpty(_existing_pipeline)) {
            const _deleted_pipeline = await delete_pipeline(pipeline_data?.id);
    
            if(!_.isEmpty(_deleted_pipeline)) return apiResponse.successResponseWithData(res, "Pipeline Deleted Successfully.", _deleted_pipeline);
            else apiResponse.ErrorResponse(res, "Unable to delete pipeline.");
        } else apiResponse.ErrorResponse(res, "Pipeline doesnot exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", pipeline_data);
});

module.exports.pipelineController = app;