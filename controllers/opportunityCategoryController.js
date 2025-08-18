
// load dependencies
const _ = require('lodash');
const { ObjectId } = require('mongodb')

// loading validators

const { canCreate, canRead, canUpdate, canDelete } = require('../middlewares/permissionMiddleware');

// loading database service
const { getNextSequence } = require('../helpers/incrementCount');
const { create, delete_opportunity_category, get_opportunity_category, get_opportunity_category_by_id, update_opportunity_category, delete_Many } = require('../services/opportunityCategoryServices');

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
        // const opportunity_category_data = _is_admin == true ? await get_opportunity_category({}) : await get_opportunity_category({ groupId: profile_data?.groupId?._id });
        const opportunity_category_data = await get_opportunity_category({});
    
        if(!_.isEmpty(opportunity_category_data)) return apiResponse.successResponseWithData(res, "Opportunity Category Status information", opportunity_category_data);
        else return apiResponse.ErrorResponse(res, "Sorry, no Opportunity Category Status data exists");
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/create', canCreate('create'), async (req, res) => {
    try {
        let opportunity_category_data = req.body;
        const { profileId } = extractToken(req?.headers?.authorization?.split('Bearer ')[1]);
        const profile_data = await get_profile_by_id(profileId);
    
        if(!_.isEmpty(opportunity_category_data)) {
            const [_existing_opportunity_category] = await get_opportunity_category({ opportunity_type_name: opportunity_category_data?.opportunity_type_name });
            if(_.isEmpty(_existing_opportunity_category)) { 
                opportunity_category_data['id'] = await getNextSequence('opportunity category');
                opportunity_category_data['profileId'] = profile_data?._id;
                opportunity_category_data['groupId'] = profile_data?.groupId?._id;
                const _new_opportunity_category = await create(opportunity_category_data);
        
                if(!_.isEmpty(_new_opportunity_category)) return apiResponse.successResponseWithData(res, "New Opportunity Category Status Created Successfully.", _new_opportunity_category);
                else apiResponse.ErrorResponse(res, "Unable to create new opportunity category.");
            } else apiResponse.ErrorResponse(res, "Opportunity Category already exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", opportunity_category_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/update', canUpdate('update'), async (req, res) => {
    try {
        const opportunity_category_data = req.body;
    
        if(!_.isEmpty(opportunity_category_data)) {
            const _existing_opportunity_category = await get_opportunity_category_by_id(opportunity_category_data?.id);
            if(!_.isEmpty(_existing_opportunity_category)) {
                const _updated_opportunity_category = await update_opportunity_category(opportunity_category_data?.id, _.omit(opportunity_category_data, ['id']));
        
                if(!_.isEmpty(_updated_opportunity_category)) return apiResponse.successResponseWithData(res, "Opportunity Category Updated Successfully.", _updated_opportunity_category);
                else apiResponse.ErrorResponse(res, "Unable to update opportunity category.");
            } else apiResponse.ErrorResponse(res, "Opportunity Category Status doesnot exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", opportunity_category_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.patch('/update/:id', canUpdate('update'), async (req, res) => {
    try {
        const opportunity_category_id = req.params.id;
        const opportunity_category_data = req.body;
    
        if(!_.isEmpty(opportunity_category_data) && opportunity_category_id != "") {
            const _existing_opportunity_category = await get_opportunity_category_by_id(opportunity_category_id);
            if(!_.isEmpty(_existing_opportunity_category)) {
                const _updated_opportunity_category = await update_opportunity_category(opportunity_category_id, _.omit(opportunity_category_data, ['id']));
        
                if(!_.isEmpty(_updated_opportunity_category)) return apiResponse.successResponseWithData(res, "Opportunity Category Updated Successfully.", _updated_opportunity_category);
                else apiResponse.ErrorResponse(res, "Unable to update opportunity category.");
            } else apiResponse.ErrorResponse(res, "Opportunity Category Status doesnot exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", opportunity_category_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/delete', canDelete('delete'), async (req, res) => {
    try {
        const opportunity_category_data = req.body;
    
        if(!_.isEmpty(opportunity_category_data)) {
            const _existing_opportunity_category = await get_opportunity_category_by_id(opportunity_category_data?.id);
            if(!_.isEmpty(_existing_opportunity_category)) {
                const _deleted_opportunity_category = await delete_opportunity_category(opportunity_category_data?.id);
        
                if(!_.isEmpty(_deleted_opportunity_category)) return apiResponse.successResponseWithData(res, "Opportunity Category Deleted Successfully.", _deleted_opportunity_category);
                else apiResponse.ErrorResponse(res, "Unable to delete opportunity category.");
            } else apiResponse.ErrorResponse(res, "Opportunity Category doesnot exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", opportunity_category_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/bulk-delete', canDelete('delete'), async (req, res) => {
    try {
        const opportunity_category_data = req.body;
    
        if(!_.isEmpty(opportunity_category_data)) {
            const _deleted_opportunity_category = await delete_Many({ _id: { $in: opportunity_category_data?.ids?.map(id => ObjectId.createFromHexString(id)) }});
            if(!_.isEmpty(_deleted_opportunity_category)) return apiResponse.successResponseWithData(res, "Opportunity Category Deleted Successfully.", _deleted_opportunity_category);
            else apiResponse.ErrorResponse(res, "Unable to delete opportunity category.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", opportunity_category_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

module.exports.OpportunityCategoryController = app;