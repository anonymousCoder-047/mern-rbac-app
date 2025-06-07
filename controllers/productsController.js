
// load dependencies
const _ = require('lodash');
const path = require('path');
const multer = require('multer');
const xlsx = require("xlsx");

// loading validators
const { canCreate, canRead, canUpdate, canDelete } = require('../middlewares/permissionMiddleware');

// loading database service
const { getNextSequence } = require('../helpers/incrementCount');
const { create, createMany, update_product, delete_product, get_product, get_product_by_id } = require('../services/productsServices');
const { createMany: createCategories } = require("../services/categoryServices");
const { createMany: createSubCategories } = require("../services/subCategoryServies");
const { createMany: createTypes } = require("../services/typeServices");
const { createMany: createSubTypes } = require("../services/subTypeServices");

const apiResponse = require('../helpers/apiResponse');
const expressRouter = require('express');
const app = expressRouter.Router();

// load configuration variables

const upload = multer({ storage: multer.memoryStorage() });

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

app.post('/import', canCreate('create'), upload.single('file_import'), async (req, res) => {

    try {
        const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames; // Read the first sheet
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName?.[0]]); // Convert sheet to JSON
        
        const _product_sub_types_data = sheetData?.length > 0 ? [...new Set(sheetData?.map((_product, _idx) => ({
            id: _idx + 1,
            sub_type_name: _product?.['Product Sub type'],
            sub_type_code: _.sampleSize("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", 4).join(""),
        })))] : []
        
        const _subTypes = await createSubTypes(_product_sub_types_data);
        
        const _product_types_data = sheetData?.length > 0 ? [...new Set(sheetData?.map((_product, _idx) => ({
            id: _idx + 1,
            type_name: _product?.['Product Type'],
            type_code: _.sampleSize("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", 4).join(""),
            sub_type: _subTypes?.find((x) => x?.sub_type_name == _product?.['Product Sub type'])?._id,
        })))] : []

        const _productTypes = await createTypes(_product_types_data);
        
        const _product_sub_category_data = sheetData?.length > 0 ? [...new Set(sheetData?.map((_product, _idx) => ({
            id: _idx + 1,
            sub_category_name: _product?.['Product Sub type'],
            sub_category_code: _.sampleSize("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", 4).join(""),
        })))] : []

        const _subCategories = await createSubCategories(_product_sub_category_data);
        
        const _product_category_data = sheetData?.length > 0 ? [...new Set(sheetData?.map((_product, _idx) => ({
            id: _idx + 1,
            category_name: _product?.['Category'],
            category_code: _.sampleSize("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", 4).join(""),
            sub_category: _subCategories?.find((x) => x?.sub_category_name == _product?.['Product Sub type'])?._id,
        })))] : []

        const _productCategories = await createCategories(_product_category_data);

        const _products_data = sheetData?.length > 0 ? [...new Set(sheetData?.map((_product, _idx) => ({ 
            id: _idx + 1, 
            product_name: _product?.['Category'], 
            product_code: _.sampleSize("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", 6).join(""),
            unit_price: _product?.['MRC'],
            description: _product?.['Rate plan'],
            tax: ["68266051cccf81ad64d0709d"],
            product_type: _productTypes?.find((x) => x?.type_name == _product?.['Product Type'])?._id,
            product_category: _productCategories?.find((x) => x?.category_name == _product?.['Category'])?._id,
            product_sub_category: _subCategories?.find((x) => x?.sub_category_name == _product?.['Product Sub type'])?._id,
        })))] : []

        const _produtcs = await createMany(_products_data);

        return apiResponse.successResponseWithData(res, "Products imported", _produtcs);
    } catch (error) {
        return apiResponse.ErrorResponse(res, "Error importing data" + error?.message);
    }

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