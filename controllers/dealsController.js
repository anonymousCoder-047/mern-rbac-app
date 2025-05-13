
// load dependencies
const _ = require('lodash');

// loading validators

const { canCreate, canRead, canUpdate, canDelete } = require('../middlewares/permissionMiddleware');

// loading database service
const { getNextSequence } = require('../helpers/incrementCount');
const { create, delete_deals, get_deals, get_deals_by_id, update_deals } = require('../services/dealsServices');

const apiResponse = require('../helpers/apiResponse');
const expressRouter = require('express');
const app = expressRouter.Router();

// load configuration variables

app.get('/view', canRead('read'), async (req, res) => {
    const deals_data = await get_deals({});

    if(!_.isEmpty(deals_data)) return apiResponse.successResponseWithData(res, "deals information", deals_data);
    else return apiResponse.ErrorResponse(res, "Sorry, no deals data exists");
});

app.post('/create', canCreate('create'), async (req, res) => {
    let deals_data = req.body;

    if(!_.isEmpty(deals_data)) {
        const [_existing_deals] = await get_deals({ order_number: deals_data?.order_number });
        if(_.isEmpty(_existing_deals)) { 
            deals_data['id'] = await getNextSequence('deals');
            const _new_deals = await create(deals_data);
    
            if(!_.isEmpty(_new_deals)) return apiResponse.successResponseWithData(res, "New deals Created Successfully.", _new_deals);
            else apiResponse.ErrorResponse(res, "Unable to create new deals.");
        } else apiResponse.ErrorResponse(res, "deals already exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", deals_data);
});

app.post('/update', canUpdate('update'), async (req, res) => {
    const deals_data = req.body;

    if(!_.isEmpty(deals_data)) {
        const _existing_deals = await get_deals_by_id(deals_data?.id);
        if(!_.isEmpty(_existing_deals)) {
            const _updated_deals = await updat(deals_data?.id, _.omit(deals_data, ['id']));
    
            if(!_.isEmpty(_updated_deals)) return apiResponse.successResponseWithData(res, "deals Updated Successfully.", _updated_deals);
            else apiResponse.ErrorResponse(res, "Unable to update deals.");
        } else apiResponse.ErrorResponse(res, "deals doesnot exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", deals_data);
});

app.patch('/update/:id', canUpdate('update'), async (req, res) => {
    const deals_id = req.params.id;
    const deals_data = req.body;

    if(!_.isEmpty(deals_data) && deals_id != "") {
        const _existing_deals = await get_deals_by_id(deals_id);
        if(!_.isEmpty(_existing_deals)) {
            const _updated_deals = await update_deals(deals_id, _.omit(deals_data, ['id']));
    
            if(!_.isEmpty(_updated_deals)) return apiResponse.successResponseWithData(res, "deals Updated Successfully.", _updated_deals);
            else apiResponse.ErrorResponse(res, "Unable to update deals.");
        } else apiResponse.ErrorResponse(res, "deals doesnot exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", deals_data);
});

app.post('/delete', canDelete('delete'), async (req, res) => {
    const deals_data = req.body;

    if(!_.isEmpty(deals_data)) {
        const _existing_deals = await get_deals_by_id(deals_data?.id);
        if(!_.isEmpty(_existing_deals)) {
            const _deleted_deals = await delete_deals(deals_data?.id);
    
            if(!_.isEmpty(_deleted_deals)) return apiResponse.successResponseWithData(res, "deals Deleted Successfully.", _deleted_deals);
            else apiResponse.ErrorResponse(res, "Unable to delete deals.");
        } else apiResponse.ErrorResponse(res, "deals doesnot exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", deals_data);
});

module.exports.dealsController = app;