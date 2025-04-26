
// load dependencies
const _ = require('lodash');

// loading database service
// const { get_users } = require('../services/userServices');

const apiResponse = require('../helpers/apiResponse');
const expressRouter = require('express');
const app = expressRouter.Router();

// load configuration variables

app.get('/', async (req, res) => {
    return apiResponse.successResponse(res, "Welcome!");
});

module.exports.dashboardController = app;