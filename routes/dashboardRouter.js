
// load dependencies
const _ = require('lodash');

// loading middleware
const { checkLoggedIn } = require('../middlewares/authMiddleware');

// loading database service
const { get_users } = require('../services/userServices');

const apiResponse = require('../helpers/apiResponse');
const expressRouter = require('express');
const app = expressRouter.Router();

// load configuration variables

app.get('/', checkLoggedIn, async (req, res) => {
    const _session = req.session?.user;
    console.log("session --> ", _session);
    if(!_.isEmpty(_session)) {
        const [ _existing_user ] = await get_users({ 'username': _session?.username });
        console.log("iam here -0000----> ", _existing_user);
        if(_.isEmpty(_existing_user)) return apiResponse.successResponse(res, "Welcome!");
        else return apiResponse.successResponse(res, `Welcome ${_existing_user?.username}!`);
    } else return apiResponse.ErrorResponse(res, "Sorry! incorrect token or token expired.");
});

module.exports.dashboardRouter = app;