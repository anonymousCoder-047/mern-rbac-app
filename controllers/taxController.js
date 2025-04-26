
// load dependencies
const _ = require('lodash');

// loading validators

const { canCreate, canRead, canUpdate, canDelete } = require('../middlewares/permissionMiddleware');

// loading database service
const { getNextSequence } = require('../helpers/incrementCount');
const { create, delete_tax, get_tax, get_tax_by_id, update_tax } = require('../services/taxServices');

const apiResponse = require('../helpers/apiResponse');
const expressRouter = require('express');
const app = expressRouter.Router();

// load configuration variables

app.get('/view', canRead('read'), async (req, res) => {
    const tax_data = await get_tax({});

    if(!_.isEmpty(tax_data)) return apiResponse.successResponseWithData(res, "Tax information", tax_data);
    else return apiResponse.ErrorResponse(res, "Sorry, no Tax data exists");
});

app.post('/create', canCreate('create'), async (req, res) => {
    let tax_data = req.body;

    if(!_.isEmpty(tax_data)) {
        const [_existing_tax] = await get_tax({ tax_code: tax_data?.tax_name });
        if(_.isEmpty(_existing_tax)) { 
            tax_data['id'] = await getNextSequence('category');
            const _new_tax = await create(tax_data);
    
            if(!_.isEmpty(_new_tax)) return apiResponse.successResponseWithData(res, "New Tax Created Successfully.", _new_tax);
            else apiResponse.ErrorResponse(res, "Unable to create new tax.");
        } else apiResponse.ErrorResponse(res, "Tax already exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", tax_data);
});

app.post('/update', canUpdate('update'), async (req, res) => {
    const tax_data = req.body;

    if(!_.isEmpty(tax_data)) {
        const _existing_tax = await get_tax_by_id(tax_data?.id);
        if(!_.isEmpty(_existing_tax)) {
            const _updated_tax = await update_tax(tax_data?.id, _.omit(tax_data, ['id']));
    
            if(!_.isEmpty(_updated_tax)) return apiResponse.successResponseWithData(res, "Tax Updated Successfully.", _updated_tax);
            else apiResponse.ErrorResponse(res, "Unable to update tax.");
        } else apiResponse.ErrorResponse(res, "Tax doesnot exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", tax_data);
});

app.patch('/update/:id', canUpdate('update'), async (req, res) => {
    const tax_id = req.params.id;
    const tax_data = req.body;

    if(!_.isEmpty(tax_data) && tax_id != "") {
        const _existing_tax = await get_tax_by_id(tax_id);
        if(!_.isEmpty(_existing_tax)) {
            const _updated_tax = await update_tax(tax_id, _.omit(tax_data, ['id']));
    
            if(!_.isEmpty(_updated_tax)) return apiResponse.successResponseWithData(res, "Tax Updated Successfully.", _updated_tax);
            else apiResponse.ErrorResponse(res, "Unable to update tax.");
        } else apiResponse.ErrorResponse(res, "Tax doesnot exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", tax_data);
});

app.post('/delete', canDelete('delete'), async (req, res) => {
    const tax_data = req.body;

    if(!_.isEmpty(tax_data)) {
        const _existing_tax = await get_tax_by_id(tax_data?.id);
        if(!_.isEmpty(_existing_tax)) {
            const _deleted_tax = await delete_tax(tax_data?.id);
    
            if(!_.isEmpty(_deleted_tax)) return apiResponse.successResponseWithData(res, "Tax Deleted Successfully.", _deleted_tax);
            else apiResponse.ErrorResponse(res, "Unable to delete tax.");
        } else apiResponse.ErrorResponse(res, "Tax doesnot exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", tax_data);
});

module.exports.taxController = app;