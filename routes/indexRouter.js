
const apiResponse = require('../helpers/apiResponse')
const expressRouter = require('express');
const app = expressRouter.Router();

app.get('/', (req, res) => {
    return apiResponse.successResponse(res, "Hello World");
})

module.exports.indexRouter = app;