
// load dependencies
const _ = require('lodash');
const { ObjectId } = require('mongodb')

// loading validators

const { canCreate, canRead, canUpdate, canDelete } = require('../middlewares/permissionMiddleware');

// loading database service
const { getNextSequence } = require('../helpers/incrementCount');
const { create, delete_sr_type, get_sr_type, get_sr_type_by_id, update_sr_type, delete_Many } = require('../services/srTypeServices');

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
        // const sr_type_data = _is_admin == true ? await get_sr_type({}) : await get_sr_type({ groupId: profile_data?.groupId?._id });
        const sr_type_data = await get_sr_type({});
    
        if(!_.isEmpty(sr_type_data)) return apiResponse.successResponseWithData(res, "SR Type Status information", sr_type_data);
        else return apiResponse.ErrorResponse(res, "Sorry, no SR Type Status data exists");
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/create', canCreate('create'), async (req, res) => {
    try {
        let sr_type_data = req.body;
        const { profileId } = extractToken(req?.headers?.authorization?.split('Bearer ')[1]);
        const profile_data = await get_profile_by_id(profileId);
    
        if(!_.isEmpty(sr_type_data)) {
            const [_existing_sr_type] = await get_sr_type({ sr_name: sr_type_data?.sr_name });
            if(_.isEmpty(_existing_sr_type)) { 
                sr_type_data['id'] = await getNextSequence('sr type');
                sr_type_data['profileId'] = profile_data?._id;
                sr_type_data['groupId'] = profile_data?.groupId?._id;
                const _new_sr_type = await create(sr_type_data);
        
                if(!_.isEmpty(_new_sr_type)) return apiResponse.successResponseWithData(res, "New SR Type Status Created Successfully.", _new_sr_type);
                else apiResponse.ErrorResponse(res, "Unable to create new sr type.");
            } else apiResponse.ErrorResponse(res, "SR Type already exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", sr_type_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/update', canUpdate('update'), async (req, res) => {
    try {
        const sr_type_data = req.body;
    
        if(!_.isEmpty(sr_type_data)) {
            const _existing_sr_type = await get_sr_type_by_id(sr_type_data?.id);
            if(!_.isEmpty(_existing_sr_type)) {
                const _updated_sr_type = await update_sr_type(sr_type_data?.id, _.omit(sr_type_data, ['id']));
        
                if(!_.isEmpty(_updated_sr_type)) return apiResponse.successResponseWithData(res, "SR Type Updated Successfully.", _updated_sr_type);
                else apiResponse.ErrorResponse(res, "Unable to update sr type.");
            } else apiResponse.ErrorResponse(res, "SR Type Status doesnot exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", sr_type_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.patch('/update/:id', canUpdate('update'), async (req, res) => {
    try {
        const sr_type_id = req.params.id;
        const sr_type_data = req.body;
    
        if(!_.isEmpty(sr_type_data) && sr_type_id != "") {
            const _existing_sr_type = await get_sr_type_by_id(sr_type_id);
            if(!_.isEmpty(_existing_sr_type)) {
                const _updated_sr_type = await update_sr_type(sr_type_id, _.omit(sr_type_data, ['id']));
        
                if(!_.isEmpty(_updated_sr_type)) return apiResponse.successResponseWithData(res, "SR Type Updated Successfully.", _updated_sr_type);
                else apiResponse.ErrorResponse(res, "Unable to update sr type.");
            } else apiResponse.ErrorResponse(res, "SR Type Status doesnot exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", sr_type_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/delete', canDelete('delete'), async (req, res) => {
    try {
        const sr_type_data = req.body;
    
        if(!_.isEmpty(sr_type_data)) {
            const _existing_sr_type = await get_sr_type_by_id(sr_type_data?.id);
            if(!_.isEmpty(_existing_sr_type)) {
                const _deleted_sr_type = await delete_sr_type(sr_type_data?.id);
        
                if(!_.isEmpty(_deleted_sr_type)) return apiResponse.successResponseWithData(res, "SR Type Deleted Successfully.", _deleted_sr_type);
                else apiResponse.ErrorResponse(res, "Unable to delete sr type.");
            } else apiResponse.ErrorResponse(res, "SR Type doesnot exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", sr_type_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/bulk-delete', canDelete('delete'), async (req, res) => {
    try {
        const sr_type_data = req.body;
    
        if(!_.isEmpty(sr_type_data)) {
            const _deleted_sr_type = await delete_Many({ _id: { $in: sr_type_data?.ids?.map(id => ObjectId.createFromHexString(id)) }});
            if(!_.isEmpty(_deleted_sr_type)) return apiResponse.successResponseWithData(res, "SR Type Deleted Successfully.", _deleted_sr_type);
            else apiResponse.ErrorResponse(res, "Unable to delete sr type.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", sr_type_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

module.exports.SRTypeController = app;