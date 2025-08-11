
const apiResponse = require('../helpers/apiResponse')
const expressRouter = require('express');
const app = expressRouter.Router();

app.get('/', (req, res) => {
    try {
        return apiResponse.successResponse(res, "Hello World");
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
})

module.exports.indexController = app;