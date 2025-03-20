
// load dependencies
const _ = require('lodash');

// loading validators

const { canCreate, canRead, canUpdate, canDelete } = require('../middlewares/permissionMiddleware');

// loading database service
const { getNextSequence } = require('../helpers/incrementCount');
const { create, update_product, delete_product, get_product, get_product_by_id } = require('../services/productsServices');

const apiResponse = require('../helpers/apiResponse');
const expressRouter = require('express');
const app = expressRouter.Router();

// load configuration variables

app.get('/view', canRead('read'), async (req, res) => {
    const products_data = await get_product({});

    if(!_.isEmpty(products_data)) return apiResponse.successResponseWithData(res, "Products information", products_data);
    else return apiResponse.ErrorResponse(res, "Sorry, no Products data exists");
});

app.get('/view/:id', canRead('read'), async (req, res) => {
    const _id = req.params.id;
    const products_data = await get_product_by_id(_id);

    if(!_.isEmpty(products_data)) return apiResponse.successResponseWithData(res, "Product information", products_data);
    else return apiResponse.ErrorResponse(res, "Sorry, no Products data exists");
});

app.post('/create', canCreate('create'), async (req, res) => {
    let products_data = req.body;

    if(!_.isEmpty(products_data)) {
        const [_existing_products] = await get_product({ product_code: products_data?.product_code });
        if(_.isEmpty(_existing_products)) { 
            products_data['id'] = await getNextSequence('products');
            const _new_products = await create(products_data);
    
            if(!_.isEmpty(_new_products)) return apiResponse.successResponseWithData(res, "New Products Created Successfully.", _new_products);
            else apiResponse.ErrorResponse(res, "Unable to create new products.");
        } else apiResponse.ErrorResponse(res, "Products already exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", products_data);
});

app.post('/update', canUpdate('update'), async (req, res) => {
    const products_data = req.body;

    if(!_.isEmpty(products_data)) {
        const _existing_products = await get_product_by_id(products_data?.id);
        if(!_.isEmpty(_existing_products)) {
            const _updated_products = await update_product(products_data?.id, _.omit(products_data, ['id']));
    
            if(!_.isEmpty(_updated_products)) return apiResponse.successResponseWithData(res, "Products Updated Successfully.", _updated_products);
            else apiResponse.ErrorResponse(res, "Unable to update products.");
        } else apiResponse.ErrorResponse(res, "Products doesnot exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", products_data);
});

app.patch('/update/:id', canUpdate('update'), async (req, res) => {
    const products_id = req.params.id;
    const products_data = req.body;

    if(!_.isEmpty(products_data) && products_id != "") {
        const _existing_products = await get_product_by_id(products_id);
        if(!_.isEmpty(_existing_products)) {
            const _updated_products = await update_product(products_id, _.omit(products_data, ['id']));
    
            if(!_.isEmpty(_updated_products)) return apiResponse.successResponseWithData(res, "Products Updated Successfully.", _updated_products);
            else apiResponse.ErrorResponse(res, "Unable to update products.");
        } else apiResponse.ErrorResponse(res, "Products doesnot exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", products_data);
});

app.post('/delete', canDelete('delete'), async (req, res) => {
    const products_data = req.body;

    if(!_.isEmpty(products_data)) {
        const _existing_products = await get_product_by_id(products_data?.id);
        if(!_.isEmpty(_existing_products)) {
            const _deleted_products = await delete_product(products_data?.id);
    
            if(!_.isEmpty(_deleted_products)) return apiResponse.successResponseWithData(res, "Products Deleted Successfully.", _deleted_products);
            else apiResponse.ErrorResponse(res, "Unable to delete products.");
        } else apiResponse.ErrorResponse(res, "Products doesnot exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", products_data);
});

module.exports.productsController = app;