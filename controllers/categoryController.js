
// load dependencies
const _ = require('lodash');
const { ObjectId } = require("mongodb");

// loading validators

const { canCreate, canRead, canUpdate, canDelete } = require('../middlewares/permissionMiddleware');

// loading database service
const { getNextSequence } = require('../helpers/incrementCount');
const { create, update_category, delete_category, get_category, get_category_by_id, delete_Many } = require('../services/categoryServices');

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
        const category_data = _is_admin === true ? await get_category({}) : await get_category({ groupId: profile_data?.groupId?._id });
    
        if(!_.isEmpty(category_data)) return apiResponse.successResponseWithData(res, "Category information", category_data);
        else return apiResponse.ErrorResponse(res, "Sorry, no Category data exists");
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/create', canCreate('create'), async (req, res) => {
    try {
        let category_data = req.body;
        const { profileId } = extractToken(req?.headers?.authorization?.split('Bearer ')[1]);
        const profile_data = await get_profile_by_id(profileId);
    
        if(!_.isEmpty(category_data)) {
            const [_existing_category] = await get_category({ category_code: category_data?.category_code });
            if(_.isEmpty(_existing_category)) { 
                category_data['id'] = await getNextSequence('category');
                category_data['profileId'] = profile_data?._id;
                category_data['groupId'] = profile_data?.groupId?._id;
                const _new_category = await create(category_data);
        
                if(!_.isEmpty(_new_category)) return apiResponse.successResponseWithData(res, "New Category Created Successfully.", _new_category);
                else apiResponse.ErrorResponse(res, "Unable to create new category.");
            } else apiResponse.ErrorResponse(res, "Category already exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", category_data);
    } catch(err) {
        console.log("Internal server error: ". err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/update', canUpdate('update'), async (req, res) => {
    try {
        const category_data = req.body;
    
        if(!_.isEmpty(category_data)) {
            const _existing_category = await get_category_by_id(category_data?.id);
            if(!_.isEmpty(_existing_category)) {
                const _updated_category = await update_category(category_data?.id, _.omit(category_data, ['id']));
        
                if(!_.isEmpty(_updated_category)) return apiResponse.successResponseWithData(res, "Category Updated Successfully.", _updated_category);
                else apiResponse.ErrorResponse(res, "Unable to update category.");
            } else apiResponse.ErrorResponse(res, "Category doesnot exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", category_data);
    } catch(err) {
        console.log("Internal server error: ". err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.patch('/update/:id', canUpdate('update'), async (req, res) => {
    try {
        const category_id = req.params.id;
        const category_data = req.body;
    
        if(!_.isEmpty(category_data) && category_id != "") {
            const _existing_category = await get_category_by_id(category_id);
            if(!_.isEmpty(_existing_category)) {
                const _updated_category = await update_category(category_id, _.omit(category_data, ['id']));
        
                if(!_.isEmpty(_updated_category)) return apiResponse.successResponseWithData(res, "Category Updated Successfully.", _updated_category);
                else apiResponse.ErrorResponse(res, "Unable to update category.");
            } else apiResponse.ErrorResponse(res, "Category doesnot exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", category_data);
    } catch(err) {
        console.log("Internal server error: ". err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/delete', canDelete('delete'), async (req, res) => {
    try {
        const category_data = req.body;
    
        if(!_.isEmpty(category_data)) {
            const _existing_category = await get_category_by_id(category_data?.id);
            if(!_.isEmpty(_existing_category)) {
                const _deleted_category = await delete_category(category_data?.id);
        
                if(!_.isEmpty(_deleted_category)) return apiResponse.successResponseWithData(res, "Category Deleted Successfully.", _deleted_category);
                else apiResponse.ErrorResponse(res, "Unable to delete category.");
            } else apiResponse.ErrorResponse(res, "Category doesnot exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", category_data);
    } catch(err) {
        console.log("Internal server error: ". err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/bulk-delete', canDelete('delete'), async (req, res) => {
    try {
        const category_data = req.body;
    
        if(!_.isEmpty(category_data)) {
            const _deleted_category = await delete_Many({ _id: { $in: category_data?.ids?.map(id => ObjectId.createFromHexString(id)) }});
            if(!_.isEmpty(_deleted_category)) return apiResponse.successResponseWithData(res, "Category Deleted Successfully.", _deleted_category);
            else apiResponse.ErrorResponse(res, "Unable to delete category.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", category_data);
    } catch(err) {
        console.log("Internal server error: ". err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

module.exports.categoryController = app;