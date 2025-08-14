
// load dependencies
const _ = require('lodash');
const { ObjectId } = require('mongodb')

// loading validators

const { canCreate, canRead, canUpdate, canDelete } = require('../middlewares/permissionMiddleware');

// loading database service
const { getNextSequence } = require('../helpers/incrementCount');
const { create, delete_opportunity_status, get_opportunity_status, get_opportunity_status_by_id, update_opportunity_status, delete_Many } = require('../services/opportunityStatusServices');

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
        // const opportunity_status_data = _is_admin == true ? await get_opportunity_status({}) : await get_opportunity_status({ groupId: profile_data?.groupId?._id });
        const opportunity_status_data = await get_opportunity_status({});
    
        if(!_.isEmpty(opportunity_status_data)) return apiResponse.successResponseWithData(res, "Opportunity Status information", opportunity_status_data);
        else return apiResponse.ErrorResponse(res, "Sorry, no Opportunity Status data exists");
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/create', canCreate('create'), async (req, res) => {
    try {
        let opportunity_status_data = req.body;
        const { profileId } = extractToken(req?.headers?.authorization?.split('Bearer ')[1]);
        const profile_data = await get_profile_by_id(profileId);
    
        if(!_.isEmpty(opportunity_status_data)) {
            const [_existing_opportunity_status] = await get_opportunity_status({ opportunity_status_code: opportunity_status_data?.opportunity_status_code });
            if(_.isEmpty(_existing_opportunity_status)) { 
                opportunity_status_data['id'] = await getNextSequence('opportunity status');
                opportunity_status_data['profileId'] = profile_data?._id;
                opportunity_status_data['groupId'] = profile_data?.groupId?._id;
                const _new_opportunity_status = await create(opportunity_status_data);
        
                if(!_.isEmpty(_new_opportunity_status)) return apiResponse.successResponseWithData(res, "New Opportunity Status Created Successfully.", _new_opportunity_status);
                else apiResponse.ErrorResponse(res, "Unable to create new opportunity status.");
            } else apiResponse.ErrorResponse(res, "Opportunity Status already exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", opportunity_status_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/update', canUpdate('update'), async (req, res) => {
    try {
        const opportunity_status_data = req.body;
    
        if(!_.isEmpty(opportunity_status_data)) {
            const _existing_opportunity_status = await get_opportunity_status_by_id(opportunity_status_data?.id);
            if(!_.isEmpty(_existing_opportunity_status)) {
                const _updated_opportunity_status = await update_opportunity_status(opportunity_status_data?.id, _.omit(opportunity_status_data, ['id']));
        
                if(!_.isEmpty(_updated_opportunity_status)) return apiResponse.successResponseWithData(res, "Opportunity Status Updated Successfully.", _updated_opportunity_status);
                else apiResponse.ErrorResponse(res, "Unable to update opportunity status.");
            } else apiResponse.ErrorResponse(res, "Opportunity Status doesnot exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", opportunity_status_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.patch('/update/:id', canUpdate('update'), async (req, res) => {
    try {
        const opportunity_status_id = req.params.id;
        const opportunity_status_data = req.body;
    
        if(!_.isEmpty(opportunity_status_data) && opportunity_status_id != "") {
            const _existing_opportunity_status = await get_opportunity_status_by_id(opportunity_status_id);
            if(!_.isEmpty(_existing_opportunity_status)) {
                const _updated_opportunity_status = await update_opportunity_status(opportunity_status_id, _.omit(opportunity_status_data, ['id']));
        
                if(!_.isEmpty(_updated_opportunity_status)) return apiResponse.successResponseWithData(res, "Opportunity Status Updated Successfully.", _updated_opportunity_status);
                else apiResponse.ErrorResponse(res, "Unable to update opportunity status.");
            } else apiResponse.ErrorResponse(res, "Opportunity Status doesnot exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", opportunity_status_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/delete', canDelete('delete'), async (req, res) => {
    try {
        const opportunity_status_data = req.body;
    
        if(!_.isEmpty(opportunity_status_data)) {
            const _existing_opportunity_status = await get_opportunity_status_by_id(opportunity_status_data?.id);
            if(!_.isEmpty(_existing_opportunity_status)) {
                const _deleted_opportunity_status = await delete_opportunity_status(opportunity_status_data?.id);
        
                if(!_.isEmpty(_deleted_opportunity_status)) return apiResponse.successResponseWithData(res, "Opportunity Status Deleted Successfully.", _deleted_opportunity_status);
                else apiResponse.ErrorResponse(res, "Unable to delete opportunity status.");
            } else apiResponse.ErrorResponse(res, "Opportunity Status doesnot exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", opportunity_status_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/bulk-delete', canDelete('delete'), async (req, res) => {
    try {
        const opportunity_status_data = req.body;
    
        if(!_.isEmpty(opportunity_status_data)) {
            const _deleted_opportunity_status = await delete_Many({ _id: { $in: opportunity_status_data?.ids?.map(id => ObjectId.createFromHexString(id)) }});
            if(!_.isEmpty(_deleted_opportunity_status)) return apiResponse.successResponseWithData(res, "Opportunity Status Deleted Successfully.", _deleted_opportunity_status);
            else apiResponse.ErrorResponse(res, "Unable to delete opportunity status.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", opportunity_status_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

module.exports.opportunityStatusController = app;