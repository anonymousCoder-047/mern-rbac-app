
// load dependencies
const _ = require('lodash');

// loading database service
const { get_users, get_user_by_id, delete_user, delete_Many } = require("../services/userServices");

const apiResponse = require('../helpers/apiResponse');
const expressRouter = require('express');
const { canRead, canDelete } = require('../middlewares/permissionMiddleware');
const { isAdmin } = require('../middlewares/authMiddleware');
const app = expressRouter.Router();

// load configuration variables

app.get('/view', canRead('read'), async (req, res) => {
    try {
        const _is_admin = await isAdmin(req, res);
        
        if(_is_admin == true) {
            const user_data = await get_users({});
        
            if(!_.isEmpty(user_data)) return apiResponse.successResponseWithData(res, "Users information", user_data);
            else return apiResponse.notFoundResponse(res, "Sorry, no users data exists");
        } else return apiResponse.forbiddenResponse(res, "Sorry, Access Denied");
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/delete', canDelete('delete'), async (req, res) => {
    try {
        const user_data = req.body;
    
        if(!_.isEmpty(user_data)) {
            const _existing_user = await get_user_by_id(user_data?.id);
            if(!_.isEmpty(_existing_user)) {
                const _deleted_user = await delete_user(user_data?.id);
        
                if(!_.isEmpty(_deleted_user)) return apiResponse.successResponseWithData(res, "user Deleted Successfully.", _deleted_user);
                else apiResponse.badRequestResponse(res, "Unable to delete user.");
            } else apiResponse.forbiddenResponse(res, "user does not exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", user_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/bulk-delete', canDelete('delete'), async (req, res) => {
    try {
        const user_data = req.body;
    
        if(!_.isEmpty(user_data)) {
            const _deleted_user = await delete_Many({ _id: { $in: user_data?.ids?.map(id => ObjectId.createFromHexString(id)) }});
            if(!_.isEmpty(_deleted_user)) return apiResponse.successResponseWithData(res, "User Deleted Successfully.", _deleted_user);
            else apiResponse.ErrorResponse(res, "Unable to delete user.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", user_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

module.exports.userController = app;