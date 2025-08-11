
// load dependencies
const _ = require('lodash');
const { ObjectId } = require('mongodb')

// loading validators

const { canCreate, canRead, canUpdate, canDelete } = require('../middlewares/permissionMiddleware');

// loading database service
const { getNextSequence } = require('../helpers/incrementCount');
const { create, delete_sub_type, get_sub_type, get_sub_type_by_id, update_sub_type, delete_Many } = require('../services/subTypeServices');

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
        const sub_type_data = _is_admin == true ? await get_sub_type({}) : await get_sub_type({ groupId: profile_data?.groupId?._id });
    
        if(!_.isEmpty(sub_type_data)) return apiResponse.successResponseWithData(res, "Sub Type information", sub_type_data);
        else return apiResponse.ErrorResponse(res, "Sorry, no Sub Type data exists");
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/create', canCreate('create'), async (req, res) => {
    try {
        let sub_type_data = req.body;
        const { profileId } = extractToken(req?.headers?.authorization?.split('Bearer ')[1]);
        const profile_data = await get_profile_by_id(profileId);
    
        if(!_.isEmpty(sub_type_data)) {
            const [_existing_sub_type] = await get_sub_type({ sub_type_code: sub_type_data?.sub_type_code });
            if(_.isEmpty(_existing_sub_type)) { 
                sub_type_data['id'] = await getNextSequence('sub_type');
                sub_type_data['profileId'] = profile_data?._id;
                sub_type_data['groupId'] = profile_data?.groupId?._id;
                const _new_sub_type = await create(sub_type_data);
        
                if(!_.isEmpty(_new_sub_type)) return apiResponse.successResponseWithData(res, "New Sub Type Created Successfully.", _new_sub_type);
                else apiResponse.ErrorResponse(res, "Unable to create new sub type.");
            } else apiResponse.ErrorResponse(res, "Sub Type already exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", sub_type_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/update', canUpdate('update'), async (req, res) => {
    try {
        const sub_type_data = req.body;
    
        if(!_.isEmpty(sub_type_data)) {
            const _existing_sub_type = await get_sub_type_by_id(sub_type_data?.id);
            if(!_.isEmpty(_existing_sub_type)) {
                const _updated_sub_type = await update_sub_type(sub_type_data?.id, _.omit(sub_type_data, ['id']));
        
                if(!_.isEmpty(_updated_sub_type)) return apiResponse.successResponseWithData(res, "Sub Type Updated Successfully.", _updated_sub_type);
                else apiResponse.ErrorResponse(res, "Unable to update sub type.");
            } else apiResponse.ErrorResponse(res, "Sub Type doesnot exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", sub_type_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.patch('/update/:id', canUpdate('update'), async (req, res) => {
    try {
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
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/delete', canDelete('delete'), async (req, res) => {
    try {
        const sub_type_data = req.body;
    
        if(!_.isEmpty(sub_type_data)) {
            const _existing_sub_type = await get_sub_type_by_id(sub_type_data?.id);
            if(!_.isEmpty(_existing_sub_type)) {
                const _deleted_sub_type = await delete_sub_type(sub_type_data?.id);
        
                if(!_.isEmpty(_deleted_sub_type)) return apiResponse.successResponseWithData(res, "Sub Type Deleted Successfully.", _deleted_sub_type);
                else apiResponse.ErrorResponse(res, "Unable to delete sub type.");
            } else apiResponse.ErrorResponse(res, "Sub Type doesnot exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", sub_type_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/bulk-delete', canDelete('delete'), async (req, res) => {
    try {
        const sub_type_data = req.body;
    
        if(!_.isEmpty(sub_type_data)) {
            const _deleted_sub_type = await delete_Many({ _id: { $in: sub_type_data?.ids?.map(id => ObjectId.createFromHexString(id)) }});
            if(!_.isEmpty(_deleted_sub_type)) return apiResponse.successResponseWithData(res, "Sub Type Deleted Successfully.", _deleted_sub_type);
            else apiResponse.ErrorResponse(res, "Unable to delete sub_type.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", sub_type_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

module.exports.subTypeController = app;