
// load dependencies
const _ = require('lodash');

// loading database service
// const { get_users } = require('../services/userServices');

const apiResponse = require('../helpers/apiResponse');
const expressRouter = require('express');
const app = expressRouter.Router();

// load configuration variables

app.get('/', async (req, res) => {
    try {
        return apiResponse.successResponse(res, "Welcome!");
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

module.exports.dashboardController = app;