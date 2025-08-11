
// load dependencies
const _ = require('lodash');
const { ObjectId } = require('mongodb')

// loading validators

const { canCreate, canRead, canUpdate, canDelete } = require('../middlewares/permissionMiddleware');

// loading database service
const { getNextSequence } = require('../helpers/incrementCount');
const { create, delete_source, get_source, get_source_by_id, update_source, delete_Many } = require('../services/sourceServices');

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
        const source_data = _is_admin == true ? await get_source({}) : await get_source({ groupId: profile_data?.groupId?._id });
    
        if(!_.isEmpty(source_data)) return apiResponse.successResponseWithData(res, "Source information", source_data);
        else return apiResponse.ErrorResponse(res, "Sorry, no Source data exists");
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/create', canCreate('create'), async (req, res) => {
    try {
        let source_data = req.body;
        const { profileId } = extractToken(req?.headers?.authorization?.split('Bearer ')[1]);
        const profile_data = await get_profile_by_id(profileId);
    
        if(!_.isEmpty(source_data)) {
            const [_existing_source] = await get_source({ source_name: source_data?.source_name });
            if(_.isEmpty(_existing_source)) { 
                source_data['id'] = await getNextSequence('source');
                source_data['profileId'] = profile_data?._id;
                source_data['groupId'] = profile_data?.groupId?._id;
                const _new_source = await create(source_data);
        
                if(!_.isEmpty(_new_source)) return apiResponse.successResponseWithData(res, "New Source Created Successfully.", _new_source);
                else apiResponse.ErrorResponse(res, "Unable to create new source.");
            } else apiResponse.ErrorResponse(res, "Source already exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", source_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/update', canUpdate('update'), async (req, res) => {
    try {
        const source_data = req.body;
    
        if(!_.isEmpty(source_data)) {
            const _existing_source = await get_source_by_id(source_data?.id);
            if(!_.isEmpty(_existing_source)) {
                const _updated_source = await update_source(source_data?.id, _.omit(source_data, ['id']));
        
                if(!_.isEmpty(_updated_source)) return apiResponse.successResponseWithData(res, "Source Updated Successfully.", _updated_source);
                else apiResponse.ErrorResponse(res, "Unable to update source.");
            } else apiResponse.ErrorResponse(res, "Source doesnot exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", source_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.patch('/update/:id', canUpdate('update'), async (req, res) => {
    try {
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
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/delete', canDelete('delete'), async (req, res) => {
    try {
        const source_data = req.body;
    
        if(!_.isEmpty(source_data)) {
            const _existing_source = await get_source_by_id(source_data?.id);
            if(!_.isEmpty(_existing_source)) {
                const _deleted_source = await delete_source(source_data?.id);
        
                if(!_.isEmpty(_deleted_source)) return apiResponse.successResponseWithData(res, "Source Deleted Successfully.", _deleted_source);
                else apiResponse.ErrorResponse(res, "Unable to delete source.");
            } else apiResponse.ErrorResponse(res, "Source doesnot exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", source_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/bulk-delete', canDelete('delete'), async (req, res) => {
    try {
        const source_data = req.body;
    
        if(!_.isEmpty(source_data)) {
            const _deleted_source = await delete_Many({ _id: { $in: source_data?.ids?.map(id => ObjectId.createFromHexString(id)) }});
            if(!_.isEmpty(_deleted_source)) return apiResponse.successResponseWithData(res, "Source Deleted Successfully.", _deleted_source);
            else apiResponse.ErrorResponse(res, "Unable to delete source.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", source_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

module.exports.sourceController = app;