
// load dependencies
const _ = require('lodash');

// load configurations 

// load sub modules
const { get_user_by_id } = require('../services/userServices');
const { get_profile_by_id } = require('../services/profileServices');
const { get_permissions_by_group_id } = require('../services/permissionsServices');
const { get_role } = require('../services/roleServices');

// lead middlewares
const { extractToken } = require("./authMiddleware");

const apiResponse = require('../helpers/apiResponse');

const isAdmin = (roles, roleId, roleName) => {
    const [name] = roles.filter((_role) => _role.id == roleId);
    
    return  name == roleName ? true : false;
}

const isGroupAdmin = (roles, roleId, roleName) => {
    const [name] = roles.filter((_role) => _role.id == roleId);
    
    return  name == roleName ? true : false;
}

const validatePermission = async (sections, fields, attributes, group, profile_id, role_id) => {
    try {
        const roles = await get_role({});
        console.log("permission data -- ", sections, fields, attributes, roles, role_id);

        if(group?.group_members?.length > 0 && group?.group_members?.includes(profile_id?._id)) {
            return true;
        } else return false;
    } catch(ex) {
        return ex;
    }
}

const checkPermission = async (req, res, next) => {
    try {
        const { _id } = extractToken(req?.headers?.authorization?.split('Bearer ')[1]);
        const { profileId } = await get_user_by_id(_id);
        const _profile = await get_profile_by_id(profileId);
        const [_permissions] = await get_permissions_by_group_id({ groupId: _profile?.groupId });
        
        if(!_.isEmpty(_permissions) && !_.isEmpty(_profile)) {
            const _permission_flag = validatePermission(_permissions.sections, _permissions.fields, _permissions.attributes, _permissions?.groupId, _profile, _profile?.roleId);
            if(_permission_flag) next();
            else return apiResponse.forbiddenResponse(res, "Sorry, Access Denied")
        } else return apiResponse.badRequestResponse(res, "Sorry, incorrect profile/permission id ", {})
    } catch(ex) {
        return apiResponse.forbiddenResponse(res, "Access denied. " + ex)
    }
}

module.exports = {
    checkPermission
};