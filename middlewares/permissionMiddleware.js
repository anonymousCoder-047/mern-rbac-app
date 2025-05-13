
// load dependencies
const _ = require('lodash');
const { ObjectId } = require("mongodb");

// load configurations 

// load sub modules
const { get_user_by_id } = require('../services/userServices');
const { get_profile_by_id } = require('../services/profileServices');
const { get_role } = require('../services/roleServices');

// lead middlewares
const { extractToken } = require("./authMiddleware");

const apiResponse = require('../helpers/apiResponse');
const { get_permissions } = require('../services/permissionsServices');

const isAdmin = (role) => {
    return  role == 'admin' ? true : false;
}

const canCreate = (action) => {
    return [
        async (req, res, next) => {
            try {
                const { _id } = extractToken(req?.headers?.authorization?.split('Bearer ')[1]);
                const { profileId } = await get_user_by_id(_id);
                const _profile = await get_profile_by_id(profileId);
                
                const [role] = await get_role({ role_id: _profile?.roleId?.role_id });
                const [permissions] = await get_permissions({ profileId: profileId });
                
                if(!_.isEmpty(_profile) && !_.isEmpty(role)) {
                    const _permission_flag = isAdmin(role?.name) ? true : permissions?.action?.includes(action) ? true : false;
                    if(_permission_flag) next();
                    else return apiResponse.forbiddenResponse(res, "Sorry, Access Denied")
                } else return apiResponse.badRequestResponse(res, "Sorry, incorrect profile/permission id ", {})
            } catch(ex) {
                return apiResponse.forbiddenResponse(res, "Access denied. " + ex)
            }
        }
    ]
}

const canRead = (action) => {
    return [
        async (req, res, next) => {
            try {
                const { _id } = extractToken(req?.headers?.authorization?.split('Bearer ')[1]);
                const { profileId } = await get_user_by_id(_id);
                const _profile = await get_profile_by_id(profileId);
                
                const [role] = await get_role({ role_id: _profile?.roleId?.role_id });
                const [permissions] = await get_permissions({ profileId: profileId });
                
                if(!_.isEmpty(_profile) && !_.isEmpty(role)) {
                    const _permission_flag = isAdmin(role?.name) ? true : permissions?.action?.includes(action) ? true : false;
                    if(_permission_flag) next();
                    else return apiResponse.forbiddenResponse(res, "Sorry, Access Denied")
                } else return apiResponse.badRequestResponse(res, "Sorry, incorrect profile/permission id ", {})
            } catch(ex) {
                return apiResponse.forbiddenResponse(res, "Access denied. " + ex)
            }
        }
    ]
}

const canUpdate = (action) => {
    return [
        async (req, res, next) => {
            try {
                const { _id } = extractToken(req?.headers?.authorization?.split('Bearer ')[1]);
                const { profileId } = await get_user_by_id(_id);
                const _profile = await get_profile_by_id(profileId);
                
                console.log("update -- ", _id, profileId, _profile);
                const [role] = await get_role({ role_id: _profile?.roleId?.role_id });
                const [permissions] = await get_permissions({ profileId: profileId });
                
                if(!_.isEmpty(_profile) && !_.isEmpty(role)) {
                    const _permission_flag = isAdmin(role?.name) ? true : permissions?.action?.includes(action) ? true : false;
                    if(_permission_flag) next();
                    else return apiResponse.forbiddenResponse(res, "Sorry, Access Denied")
                } else return apiResponse.badRequestResponse(res, "Sorry, incorrect profile/permission id ", {})
            } catch(ex) {
                return apiResponse.forbiddenResponse(res, "Access denied. " + ex)
            }
        }
    ]
}

const canDelete = (action) => {
    return [
        async (req, res, next) => {
            try {
                const { _id } = extractToken(req?.headers?.authorization?.split('Bearer ')[1]);
                const { profileId } = await get_user_by_id(_id);
                const _profile = await get_profile_by_id(profileId);
                
                const [role] = await get_role({ role_id: _profile?.roleId?.role_id });
                const [permissions] = await get_permissions({ profileId: profileId });
                
                if(!_.isEmpty(_profile) && !_.isEmpty(role)) {
                    const _permission_flag = isAdmin(role?.name) ? true : permissions?.action?.includes(action) ? true : false;
                    if(_permission_flag) next();
                    else return apiResponse.forbiddenResponse(res, "Sorry, Access Denied")
                } else return apiResponse.badRequestResponse(res, "Sorry, incorrect profile/permission id ", {})
            } catch(ex) {
                return apiResponse.forbiddenResponse(res, "Access denied. " + ex)
            }
        }
    ]
}

module.exports = {
    canCreate,
    canRead,
    canUpdate,
    canDelete,
};