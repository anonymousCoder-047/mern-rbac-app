
// load dependencies
const axios = require('axios');

const apiResponse = require('../helpers/apiResponse');
const expressRouter = require('express');
const app = expressRouter.Router();

const { external_api_link } = require('../config/config');

app.post('/search-google', async (req, res) => {
    try {
        const { searchText } = req.body;

        if(searchText) {
            const resp = await axios.post(`${external_api_link}/search-google`, {
                searchText: searchText
            });

            if(resp) return apiResponse.successResponseWithData(res, "Predictions found ", resp?.data?.data); 
            else return apiResponse.ErrorResponse(res, "No data found");
        } else return apiResponse.ErrorResponse(res, "No inputs provided");
    } catch(ex) {
        return apiResponse.ErrorResponse(res, "Internal server error E: " + ex?.message);
    }
});

app.post('/search-corodinates', async (req, res) => {
    try {
        const { xCoordinate, yCoordinate, place_id } = req.body;

        if(xCoordinate && yCoordinate) {
            const resp = await axios.post(`${external_api_link}/search-corodinates`, {
                xCoordinate: xCoordinate, yCoordinate: yCoordinate
            });

            if(resp) return apiResponse.successResponseWithData(res, "Site found ", resp?.data?.data); 
            else return apiResponse.ErrorResponse(res, "No data found");
        } else if(place_id) {
            const resp = await axios.post(`${external_api_link}/search-corodinates`, {
                place_id: place_id
            });
            
            if(resp) return apiResponse.successResponseWithData(res, "Site found ", resp?.data?.data); 
            else return apiResponse.ErrorResponse(res, "No data found");
        } else return apiResponse.ErrorResponse(res, "No inputs provided");
    } catch(ex) {
        return apiResponse.ErrorResponse(res, "Internal server error E: " + ex?.message);
    }
});

app.post('/search-by', async (req, res) => {
    try {
        const { searchItem, searchText } = req.body;

        if(searchItem) {
            const resp = await axios.post(`${external_api_link}/search-by`, {
                "searchText": searchText,
                "searchItem": searchItem
            });
            
            if(resp) return apiResponse.successResponseWithData(res, "Site found ", resp?.data?.data); 
            else return apiResponse.ErrorResponse(res, "No data found");
        } else return apiResponse.ErrorResponse(res, "No inputs provided");
    } catch(ex) {
        return apiResponse.ErrorResponse(res, "Internal server error E: " + ex?.message);
    }
});

module.exports.siteLocatorController = app;