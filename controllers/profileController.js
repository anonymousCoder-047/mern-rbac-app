
// load dependencies
const _ = require('lodash');

// loading validators
const {
    validateCreateProfile,
    validateUpdateProfile,
    validateDeleteProfile
} = require('../middlewares/validatorMiddleware');

// loading database service
const { getNextSequence } = require('../helpers/incrementCount');
const { create, get_profile, get_profile_by_id, update_profile, delete_profile } = require('../services/profileServices');

const apiResponse = require('../helpers/apiResponse');
const expressRouter = require('express');
const { canCreate, canRead, canUpdate, canDelete } = require('../middlewares/permissionMiddleware');
const app = expressRouter.Router();

// load configuration variables

app.get('/view', canRead('read'), async (req, res) => {
    const profile_data = await get_profile({});

    if(!_.isEmpty(profile_data)) return apiResponse.successResponseWithData(res, "Profile information", profile_data);
    else return apiResponse.notFoundResponse(res, "Sorry, no profile data exists");
});

app.post('/create', validateCreateProfile, canCreate('create'), async (req, res) => {
    let profile_data = req.body;

    if(!_.isEmpty(profile_data)) {
        const [_existing_profile] = await get_profile({ username: profile_data?.username });
        if(_.isEmpty(_existing_profile)) { 
            profile_data['id'] = await getNextSequence('profile');
            const _new_profile = await create(profile_data);
    
            if(!_.isEmpty(_new_profile)) return apiResponse.successResponseWithData(res, "New profile Created Successfully.", _new_profile);
            else apiResponse.badRequestResponse(res, "Unable to create new profile.");
        } else apiResponse.forbiddenResponse(res, "profile already exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", profile_data);
});

app.post('/update', validateUpdateProfile, canUpdate('update'), async (req, res) => {
    const profile_data = req.body;

    if(!_.isEmpty(profile_data)) {
        const _existing_profile = await get_profile_by_id(profile_data?.id);
        if(!_.isEmpty(_existing_profile)) {
            const _updated_profile = await update_profile(profile_data?.id, _.omit(profile_data, ['id']));
    
            if(!_.isEmpty(_updated_profile)) return apiResponse.successResponseWithData(res, "profile Updated Successfully.", _updated_profile);
            else apiResponse.badRequestResponse(res, "Unable to update profile.");
        } else apiResponse.forbiddenResponse(res, "profile does not exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", profile_data);
});

app.patch('/update/:id', canUpdate('update'), async (req, res) => {
    try {
        const profile_id = req.params.id;
        const profile_data = req.body;
    
        if(!_.isEmpty(profile_data) && profile_id != "") {
            const _existing_profile = await get_profile_by_id(profile_id);
            if(!_.isEmpty(_existing_profile)) {
                const _updated_profile = await update_profile(profile_id, _.omit(profile_data, ['id']));
        
                if(!_.isEmpty(_updated_profile)) return apiResponse.successResponseWithData(res, "Profile Updated Successfully.", _updated_profile);
                else apiResponse.badRequestResponse(res, "Unable to update profile.");
            } else apiResponse.forbiddenResponse(res, "Profile does not exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", role_data);
    } catch(ex) {
        return apiResponse.ErrorResponse(res, "Error something went wrong E: ", ex);
    }
});

app.post('/delete', validateDeleteProfile, canDelete('delete'), async (req, res) => {
    const profile_data = req.body;

    if(!_.isEmpty(profile_data)) {
        const _existing_profile = await get_profile_by_id(profile_data?.id);
        if(!_.isEmpty(_existing_profile)) {
            const _deleted_profile = await delete_profile(profile_data?.id);
    
            if(!_.isEmpty(_deleted_profile)) return apiResponse.successResponseWithData(res, "profile Deleted Successfully.", _deleted_profile);
            else apiResponse.badRequestResponse(res, "Unable to delete profile.");
        } else apiResponse.forbiddenResponse(res, "profile does not exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", profile_data);
});

module.exports.profileController = app;