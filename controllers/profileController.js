
// load dependencies
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongodb')

// loading validators
const {
    validateCreateProfile,
    validateUpdateProfile,
    validateDeleteProfile
} = require('../middlewares/validatorMiddleware');

// loading database service
const { getNextSequence } = require('../helpers/incrementCount');
const { create, get_profile, get_profile_by_id, update_profile, delete_profile, delete_Many } = require('../services/profileServices');
const { create: createUser, get_user_by_id } = require("../services/userServices");
const { create: createPermissions, get_permissions } = require("../services/permissionsServices");

const apiResponse = require('../helpers/apiResponse');
const expressRouter = require('express');
const { canCreate, canRead, canUpdate, canDelete } = require('../middlewares/permissionMiddleware');
const { extractToken, isAdmin } = require('../middlewares/authMiddleware');
const app = expressRouter.Router();

// load configuration variables

app.get('/view', canRead('read'), async (req, res) => {
    try {
        const _is_admin = await isAdmin(req, res);
        
        if(_is_admin == true) {
            const profile_data = await get_profile({});
        
            if(!_.isEmpty(profile_data)) return apiResponse.successResponseWithData(res, "Profile information", profile_data);
            else return apiResponse.notFoundResponse(res, "Sorry, no profile data exists");
        } else {
            const { profileId } = extractToken(req?.headers?.authorization?.split('Bearer ')[1]);
            const profile_data = await get_profile_by_id(profileId);
            const _profile_data = await get_profile({ groupId: profile_data?.groupId?._id });

            if(!_.isEmpty(_profile_data)) return apiResponse.successResponseWithData(res, "Profile information", _profile_data);
            else return apiResponse.notFoundResponse(res, "Sorry, no profile data exists");
        }
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.get('/me', canRead('read'), async (req, res) => {
    try {
        const { _id } = extractToken(req?.headers?.authorization?.split('Bearer ')[1]);
        const profile_data = await get_user_by_id(_id);
        const _profile = await get_profile_by_id(profile_data?.profileId);
        const [_permissions] = await get_permissions({ profileId: profile_data?.profileId })
    
        if(!_.isEmpty(profile_data)) return apiResponse.successResponseWithData(res, "Profile information", { ..._.pick(profile_data, ['username', 'email', 'profileId', '_id']), ..._.pick(_profile, ['roleId', 'groupId']), permissions: _permissions?.action });
        else return apiResponse.notFoundResponse(res, "Sorry, no profile data exists");
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/create', validateCreateProfile, canCreate('create'), async (req, res) => {
    try {
        let profile_data = req.body;
    
        if(!_.isEmpty(profile_data)) {
            const [_existing_profile] = await get_profile({ username: profile_data?.username });
            if(_.isEmpty(_existing_profile)) { 
                profile_data['id'] = await getNextSequence('profile');
                const _new_profile = await create(profile_data);
                const hashedPassword = await bcrypt.hash(profile_data.password, 10);
                let _user_data = {
                    id: await getNextSequence('users'),
                    username: profile_data?.email?.split("@")?.[0] ?? "",
                    email: profile_data?.email,
                    password: hashedPassword,
                    profileId: _new_profile?._id
                }
    
                let _permissions_data = {
                    id: await getNextSequence('permissions'),
                    action: profile_data?.action,
                    profileId: _new_profile?._id
                }
        
                if(!_.isEmpty(_new_profile)) {
                    const _new_usr = await createUser(_user_data);
                    const _new_perm = await createPermissions(_permissions_data);
    
                    return apiResponse.successResponseWithData(res, "New profile Created Successfully.", _new_profile)
                } else apiResponse.badRequestResponse(res, "Unable to create new profile.");
            } else apiResponse.forbiddenResponse(res, "profile already exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", profile_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/update', validateUpdateProfile, canUpdate('update'), async (req, res) => {
    try {
        const profile_data = req.body;
    
        if(!_.isEmpty(profile_data)) {
            const _existing_profile = await get_profile_by_id(profile_data?.id);
            if(!_.isEmpty(_existing_profile)) {
                const _updated_profile = await update_profile(profile_data?.id, _.omit(profile_data, ['id']));
        
                if(!_.isEmpty(_updated_profile)) return apiResponse.successResponseWithData(res, "profile Updated Successfully.", _updated_profile);
                else apiResponse.badRequestResponse(res, "Unable to update profile.");
            } else apiResponse.forbiddenResponse(res, "profile does not exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", profile_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
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
    try {
        const profile_data = req.body;
    
        if(!_.isEmpty(profile_data)) {
            const _existing_profile = await get_profile_by_id(profile_data?.id);
            if(!_.isEmpty(_existing_profile)) {
                const _deleted_profile = await delete_profile(profile_data?.id);
        
                if(!_.isEmpty(_deleted_profile)) return apiResponse.successResponseWithData(res, "profile Deleted Successfully.", _deleted_profile);
                else apiResponse.badRequestResponse(res, "Unable to delete profile.");
            } else apiResponse.forbiddenResponse(res, "profile does not exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", profile_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/bulk-delete', canDelete('delete'), async (req, res) => {
    try {
        const profile_data = req.body;
    
        if(!_.isEmpty(profile_data)) {
            const _deleted_profile = await delete_Many({ _id: { $in: profile_data?.ids?.map(id => ObjectId.createFromHexString(id)) }});
            if(!_.isEmpty(_deleted_profile)) return apiResponse.successResponseWithData(res, "Profile Deleted Successfully.", _deleted_profile);
            else apiResponse.ErrorResponse(res, "Unable to delete profile.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", profile_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

module.exports.profileController = app;