
// load dependencies
const _ = require('lodash');
const { ObjectId } = require("mongodb")

// loading validators
const {
    validateCreateGroup,
    validateUpdateGroup,
    validateDeleteGroup,
} = require('../middlewares/validatorMiddleware');

const { canCreate, canRead, canUpdate, canDelete } = require("../middlewares/permissionMiddleware");

// loading database service
const { getNextSequence } = require('../helpers/incrementCount');
const { create, get_group, get_group_by_id, update_group, delete_group, delete_Many } = require('../services/groupServices');

const apiResponse = require('../helpers/apiResponse');
const expressRouter = require('express');
const { isAdmin } = require('../middlewares/authMiddleware');
const app = expressRouter.Router();

// load configuration variables

app.get('/view', canRead('read'), async (req, res) => {
    try {
        const _is_admin = await isAdmin(req, res);
        
        if(_is_admin == true) {
            const group_data = await get_group({});
        
            if(!_.isEmpty(group_data)) return apiResponse.successResponseWithData(res, "Groups information", group_data);
            else return apiResponse.ErrorResponse(res, "Sorry, no group data exists");
        } else return apiResponse.forbiddenResponse(res, "Sorry, Access Denied");
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/create', validateCreateGroup, canCreate('create'), async (req, res) => {
    try {
        let group_data = req.body;
    
        if(!_.isEmpty(group_data)) {
            const [_existing_group] = await get_group({ group_name: group_data?.group_name });
            if(_.isEmpty(_existing_group)) { 
                group_data['id'] = await getNextSequence('groups');
                const _new_group = await create(group_data);
        
                if(!_.isEmpty(_new_group)) return apiResponse.successResponseWithData(res, "New Group Created Successfully.", _new_group);
                else apiResponse.badRequestResponse(res, "Unable to create new group.");
            } else apiResponse.forbiddenResponse(res, "Group already exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", group_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/update', validateUpdateGroup, canUpdate('update'), async (req, res) => {
    try {
        const group_data = req.body;
    
        if(!_.isEmpty(group_data)) {
            const _existing_group = await get_group_by_id(group_data?.id);
            if(!_.isEmpty(_existing_group)) {
                const _updated_group = await update_group(group_data?.id, _.omit(group_data, ['id']));
        
                if(!_.isEmpty(_updated_group)) return apiResponse.successResponseWithData(res, "Group Updated Successfully.", _updated_group);
                else apiResponse.badRequestResponse(res, "Unable to update group.");
            } else apiResponse.forbiddenResponse(res, "Group doesnot exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", group_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.patch('/update/:id', canUpdate('update'), async (req, res) => {
    try {
        const group_id = req.params.id;
        const group_data = req.body;
    
        if(!_.isEmpty(group_data) && group_id != "") {
            const _existing_group = await get_group_by_id(group_id);
            if(!_.isEmpty(_existing_group)) {
                const _updated_group = await update_group(group_id, _.omit(group_data, ['id']));
        
                if(!_.isEmpty(_updated_group)) return apiResponse.successResponseWithData(res, "Group Updated Successfully.", _updated_group);
                else apiResponse.badRequestResponse(res, "Unable to update group.");
            } else apiResponse.forbiddenResponse(res, "Group doesnot exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", group_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/delete', validateDeleteGroup, canDelete('delete'), async (req, res) => {
    try {
        const group_data = req.body;
    
        if(!_.isEmpty(group_data)) {
            const _existing_group = await get_group_by_id(group_data?.id);
            if(!_.isEmpty(_existing_group)) {
                const _deleted_group = await delete_group(group_data?.id);
        
                if(!_.isEmpty(_deleted_group)) return apiResponse.successResponseWithData(res, "Group Deleted Successfully.", _deleted_group);
                else apiResponse.badRequestResponse(res, "Unable to delete group.");
            } else apiResponse.forbiddenResponse(res, "Group doesnot exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", group_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/bulk-delete', canDelete('delete'), async (req, res) => {
    try {
        const group_data = req.body;
    
        if(!_.isEmpty(group_data)) {
            const _deleted_group = await delete_Many({ _id: { $in: group_data?.ids?.map(id => ObjectId.createFromHexString(id)) }});
            if(!_.isEmpty(_deleted_group)) return apiResponse.successResponseWithData(res, "Group Deleted Successfully.", _deleted_group);
            else apiResponse.ErrorResponse(res, "Unable to delete group.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", group_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

module.exports.groupController = app;