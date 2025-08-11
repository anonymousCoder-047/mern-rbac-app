
// load dependencies
const _ = require('lodash');
const { ObjectId } = require('mongodb')

// loading validators

const { canCreate, canRead, canUpdate, canDelete } = require('../middlewares/permissionMiddleware');

// loading database service
const { getNextSequence } = require('../helpers/incrementCount');
const { create, update_type, delete_type, get_type, get_type_by_id, delete_Many } = require('../services/typeServices');

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
        const type_data = _is_admin == true ? await get_type({}) : await get_type({ groupId: profile_data?.groupId?._id });
    
        if(!_.isEmpty(type_data)) return apiResponse.successResponseWithData(res, "Type information", type_data);
        else return apiResponse.ErrorResponse(res, "Sorry, no Type data exists");
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/create', canCreate('create'), async (req, res) => {
    try {
        let type_data = req.body;
        const { profileId } = extractToken(req?.headers?.authorization?.split('Bearer ')[1]);
        const profile_data = await get_profile_by_id(profileId);
    
        if(!_.isEmpty(type_data)) {
            const [_existing_type] = await get_type({ type_code: type_data?.type_code });
            if(_.isEmpty(_existing_type)) { 
                type_data['id'] = await getNextSequence('type');
                type_data['profileId'] = profile_data?._id;
                type_data['groupId'] = profile_data?.groupId?._id;
                const _new_type = await create(type_data);
        
                if(!_.isEmpty(_new_type)) return apiResponse.successResponseWithData(res, "New Type Created Successfully.", _new_type);
                else apiResponse.ErrorResponse(res, "Unable to create new type.");
            } else apiResponse.ErrorResponse(res, "Type already exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", type_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/update', canUpdate('update'), async (req, res) => {
    try {
        const type_data = req.body;
    
        if(!_.isEmpty(type_data)) {
            const _existing_type = await get_type_by_id(type_data?.id);
            if(!_.isEmpty(_existing_type)) {
                const _updated_type = await update_type(type_data?.id, _.omit(type_data, ['id']));
        
                if(!_.isEmpty(_updated_type)) return apiResponse.successResponseWithData(res, "Type Updated Successfully.", _updated_type);
                else apiResponse.ErrorResponse(res, "Unable to update type.");
            } else apiResponse.ErrorResponse(res, "Type doesnot exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", type_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.patch('/update/:id', canUpdate('update'), async (req, res) => {
    try {
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
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/delete', canDelete('delete'), async (req, res) => {
    try {
        const type_data = req.body;
    
        if(!_.isEmpty(type_data)) {
            const _existing_type = await get_type_by_id(type_data?.id);
            if(!_.isEmpty(_existing_type)) {
                const _deleted_type = await delete_type(type_data?.id);
        
                if(!_.isEmpty(_deleted_type)) return apiResponse.successResponseWithData(res, "Type Deleted Successfully.", _deleted_type);
                else apiResponse.ErrorResponse(res, "Unable to delete type.");
            } else apiResponse.ErrorResponse(res, "Type doesnot exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", type_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/bulk-delete', canDelete('delete'), async (req, res) => {
    try {
        const type_data = req.body;
    
        if(!_.isEmpty(type_data)) {
            const _deleted_type = await delete_Many({ _id: { $in: type_data?.ids?.map(id => ObjectId.createFromHexString(id)) }});
            if(!_.isEmpty(_deleted_type)) return apiResponse.successResponseWithData(res, "Type Deleted Successfully.", _deleted_type);
            else apiResponse.ErrorResponse(res, "Unable to delete type.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", type_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

module.exports.typeController = app;