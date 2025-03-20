
// load dependencies
const _ = require('lodash');

// loading validators

const { canCreate, canRead, canUpdate, canDelete } = require('../middlewares/permissionMiddleware');

// loading database service
const { getNextSequence } = require('../helpers/incrementCount');
const { create, delete_company, get_company, get_company_by_id, update_company } = require('../services/companyServices');

const apiResponse = require('../helpers/apiResponse');
const expressRouter = require('express');
const app = expressRouter.Router();

// load configuration variables

app.get('/view', canRead('read'), async (req, res) => {
    const company_data = await get_company({});

    if(!_.isEmpty(company_data)) return apiResponse.successResponseWithData(res, "Company information", company_data);
    else return apiResponse.ErrorResponse(res, "Sorry, no Company data exists");
});

app.post('/create', canCreate('create'), async (req, res) => {
    let company_data = req.body;

    if(!_.isEmpty(company_data)) {
        const [_existing_company] = await get_company({ company_name: company_data?.company_name });
        if(_.isEmpty(_existing_company)) { 
            company_data['id'] = await getNextSequence('company');
            const _new_company = await create(company_data);
    
            if(!_.isEmpty(_new_company)) return apiResponse.successResponseWithData(res, "New Company Created Successfully.", _new_company);
            else apiResponse.ErrorResponse(res, "Unable to create new company.");
        } else apiResponse.ErrorResponse(res, "Company already exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", company_data);
});

app.post('/update', canUpdate('update'), async (req, res) => {
    const company_data = req.body;

    if(!_.isEmpty(company_data)) {
        const _existing_company = await get_company_by_id(company_data?.id);
        if(!_.isEmpty(_existing_company)) {
            const _updated_company = await updat(company_data?.id, _.omit(company_data, ['id']));
    
            if(!_.isEmpty(_updated_company)) return apiResponse.successResponseWithData(res, "Company Updated Successfully.", _updated_company);
            else apiResponse.ErrorResponse(res, "Unable to update company.");
        } else apiResponse.ErrorResponse(res, "Company doesnot exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", company_data);
});

app.patch('/update/:id', canUpdate('update'), async (req, res) => {
    const company_id = req.params.id;
    const company_data = req.body;

    if(!_.isEmpty(company_data) && company_id != "") {
        const _existing_company = await get_company_by_id(company_id);
        if(!_.isEmpty(_existing_company)) {
            const _updated_company = await update_company(company_id, _.omit(company_data, ['id']));
    
            if(!_.isEmpty(_updated_company)) return apiResponse.successResponseWithData(res, "Company Updated Successfully.", _updated_company);
            else apiResponse.ErrorResponse(res, "Unable to update company.");
        } else apiResponse.ErrorResponse(res, "Company doesnot exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", company_data);
});

app.post('/delete', canDelete('delete'), async (req, res) => {
    const company_data = req.body;

    if(!_.isEmpty(company_data)) {
        const _existing_company = await get_company_by_id(company_data?.id);
        if(!_.isEmpty(_existing_company)) {
            const _deleted_company = await delete_company(company_data?.id);
    
            if(!_.isEmpty(_deleted_company)) return apiResponse.successResponseWithData(res, "Company Deleted Successfully.", _deleted_company);
            else apiResponse.ErrorResponse(res, "Unable to delete company.");
        } else apiResponse.ErrorResponse(res, "Company doesnot exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", company_data);
});

module.exports.companyController = app;