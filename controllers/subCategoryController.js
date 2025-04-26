
// load dependencies
const _ = require('lodash');

// loading validators

const { canCreate, canRead, canUpdate, canDelete } = require('../middlewares/permissionMiddleware');

// loading database service
const { getNextSequence } = require('../helpers/incrementCount');
const { create, delete_sub_category, get_sub_category, get_sub_category_by_id, update_sub_category } = require('../services/subCategoryServies');

const apiResponse = require('../helpers/apiResponse');
const expressRouter = require('express');
const app = expressRouter.Router();

// load configuration variables

app.get('/view', canRead('read'), async (req, res) => {
    const sub_category_data = await get_sub_category({});

    if(!_.isEmpty(sub_category_data)) return apiResponse.successResponseWithData(res, "Sub Category information", sub_category_data);
    else return apiResponse.ErrorResponse(res, "Sorry, no Sub Category data exists");
});

app.post('/create', canCreate('create'), async (req, res) => {
    let sub_category_data = req.body;

    if(!_.isEmpty(sub_category_data)) {
        const [_existing_sub_category] = await get_sub_category({ sub_category_code: sub_category_data?.sub_category_code });
        if(_.isEmpty(_existing_sub_category)) { 
            sub_category_data['id'] = await getNextSequence('category');
            const _new_sub_category = await create(sub_category_data);
    
            if(!_.isEmpty(_new_sub_category)) return apiResponse.successResponseWithData(res, "New Sub Category Created Successfully.", _new_sub_category);
            else apiResponse.ErrorResponse(res, "Unable to create new sub category.");
        } else apiResponse.ErrorResponse(res, "Sub Category already exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", sub_category_data);
});

app.post('/update', canUpdate('update'), async (req, res) => {
    const sub_category_data = req.body;

    if(!_.isEmpty(sub_category_data)) {
        const _existing_sub_category = await get_sub_category_by_id(sub_category_data?.id);
        if(!_.isEmpty(_existing_sub_category)) {
            const _updated_sub_category = await update_sub_category(sub_category_data?.id, _.omit(sub_category_data, ['id']));
    
            if(!_.isEmpty(_updated_sub_category)) return apiResponse.successResponseWithData(res, "Sub Category Updated Successfully.", _updated_sub_category);
            else apiResponse.ErrorResponse(res, "Unable to update sub category.");
        } else apiResponse.ErrorResponse(res, "Sub Category doesnot exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", sub_category_data);
});

app.patch('/update/:id', canUpdate('update'), async (req, res) => {
    const sub_category_id = req.params.id;
    const sub_category_data = req.body;

    if(!_.isEmpty(sub_category_data) && sub_category_id != "") {
        const _existing_sub_category = await get_sub_category_by_id(sub_category_id);
        if(!_.isEmpty(_existing_sub_category)) {
            const _updated_sub_category = await update_sub_category(sub_category_id, _.omit(sub_category_data, ['id']));
    
            if(!_.isEmpty(_updated_sub_category)) return apiResponse.successResponseWithData(res, "Sub Category Updated Successfully.", _updated_sub_category);
            else apiResponse.ErrorResponse(res, "Unable to update sub category.");
        } else apiResponse.ErrorResponse(res, "Sub Category doesnot exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", sub_category_data);
});

app.post('/delete', canDelete('delete'), async (req, res) => {
    const sub_category_data = req.body;

    if(!_.isEmpty(sub_category_data)) {
        const _existing_sub_category = await get_sub_category_by_id(sub_category_data?.id);
        if(!_.isEmpty(_existing_sub_category)) {
            const _deleted_sub_category = await delete_sub_category(sub_category_data?.id);
    
            if(!_.isEmpty(_deleted_sub_category)) return apiResponse.successResponseWithData(res, "Sub Category Deleted Successfully.", _deleted_sub_category);
            else apiResponse.ErrorResponse(res, "Unable to delete sub category.");
        } else apiResponse.ErrorResponse(res, "Sub Category doesnot exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", sub_category_data);
});

module.exports.subCategoryController = app;