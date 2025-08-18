
// load dependencies
const _ = require('lodash');
const { ObjectId } = require('mongodb')

// loading validators

const { canCreate, canRead, canUpdate, canDelete } = require('../middlewares/permissionMiddleware');

// loading database service
const { getNextSequence } = require('../helpers/incrementCount');
const { create, delete_pipeline, get_pipeline, get_pipeline_by_id, update_pipeline, delete_Many } = require('../services/pipelineServices');

const apiResponse = require('../helpers/apiResponse');
const expressRouter = require('express');
const { extractToken, isAdmin } = require('../middlewares/authMiddleware');
const { get_profile_by_id } = require('../services/profileServices');
const app = expressRouter.Router();

// load configuration variables

app.get('/view', canRead('read'), async (req, res) => {
    try {
        const { profileId } = extractToken(req?.headers?.authorization?.split('Bearer ')[1]);
        const profile_data = await get_profile_by_id(profileId);
        const _is_admin = await isAdmin(req, res);
        const pipeline_data = _is_admin == true ? await get_pipeline({}) : await get_pipeline({ groupId: profile_data?.groupId?._id });
        // const pipeline_data = await get_pipeline({});
    
        if(!_.isEmpty(pipeline_data)) return apiResponse.successResponseWithData(res, "Pipeline information", pipeline_data);
        else return apiResponse.ErrorResponse(res, "Sorry, no Pipeline data exists");
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/create', canCreate('create'), async (req, res) => {
    try {
        let pipeline_data = req.body;
        const { profileId } = extractToken(req?.headers?.authorization?.split('Bearer ')[1]);
        const profile_data = await get_profile_by_id(profileId);
    
        if(!_.isEmpty(pipeline_data)) {
            const [_existing_pipeline] = await get_pipeline({ pipeline_name: pipeline_data?.pipeline_name });
            if(_.isEmpty(_existing_pipeline)) { 
                pipeline_data['id'] = await getNextSequence('pipeline');
                pipeline_data['profileId'] = profile_data?._id;
                pipeline_data['groupId'] = profile_data?.groupId?._id;
                const _new_pipeline = await create(pipeline_data);
        
                if(!_.isEmpty(_new_pipeline)) return apiResponse.successResponseWithData(res, "New Pipeline Created Successfully.", _new_pipeline);
                else apiResponse.ErrorResponse(res, "Unable to create new pipeline.");
            } else apiResponse.ErrorResponse(res, "Pipeline already exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", pipeline_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/update', canUpdate('update'), async (req, res) => {
    try {
        const pipeline_data = req.body;
    
        if(!_.isEmpty(pipeline_data)) {
            const _existing_pipeline = await get_pipeline_by_id(pipeline_data?.id);
            if(!_.isEmpty(_existing_pipeline)) {
                const _updated_pipeline = await updat(pipeline_data?.id, _.omit(pipeline_data, ['id']));
        
                if(!_.isEmpty(_updated_pipeline)) return apiResponse.successResponseWithData(res, "Pipeline Updated Successfully.", _updated_pipeline);
                else apiResponse.ErrorResponse(res, "Unable to update pipeline.");
            } else apiResponse.ErrorResponse(res, "Pipeline doesnot exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", pipeline_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.patch('/update/:id', canUpdate('update'), async (req, res) => {
    try {
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
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/delete', canDelete('delete'), async (req, res) => {
    try {
        const pipeline_data = req.body;
    
        if(!_.isEmpty(pipeline_data)) {
            const _existing_pipeline = await get_pipeline_by_id(pipeline_data?.id);
            if(!_.isEmpty(_existing_pipeline)) {
                const _deleted_pipeline = await delete_pipeline(pipeline_data?.id);
        
                if(!_.isEmpty(_deleted_pipeline)) return apiResponse.successResponseWithData(res, "Pipeline Deleted Successfully.", _deleted_pipeline);
                else apiResponse.ErrorResponse(res, "Unable to delete pipeline.");
            } else apiResponse.ErrorResponse(res, "Pipeline doesnot exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", pipeline_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/bulk-delete', canDelete('delete'), async (req, res) => {
    try {
        const pipeline_data = req.body;
    
        if(!_.isEmpty(pipeline_data)) {
            const _deleted_pipeline = await delete_Many({ _id: { $in: pipeline_data?.ids?.map(id => ObjectId.createFromHexString(id)) }});
            if(!_.isEmpty(_deleted_pipeline)) return apiResponse.successResponseWithData(res, "Pipeline Deleted Successfully.", _deleted_pipeline);
            else apiResponse.ErrorResponse(res, "Unable to delete pipeline.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", pipeline_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

module.exports.pipelineController = app;