
// load dependencies
const _ = require('lodash');
const path = require('path');
const multer = require('multer');
const xlsx = require("xlsx");
const { ObjectId } = require("mongodb")

// loading validators
const { canCreate, canRead, canUpdate, canDelete } = require('../middlewares/permissionMiddleware');

// loading database service
const { getNextSequence } = require('../helpers/incrementCount');
const { create, createMany, update_product, delete_product, get_product, get_product_by_id, delete_Many } = require('../services/productsServices');
const { createMany: createCategories } = require("../services/productsServices");
const { createMany: createSubCategories } = require("../services/subCategoryServies");
const { createMany: createTypes } = require("../services/typeServices");
const { createMany: createSubTypes } = require("../services/subTypeServices");

const apiResponse = require('../helpers/apiResponse');
const expressRouter = require('express');
const { extractToken, isAdmin } = require('../middlewares/authMiddleware');
const { get_profile_by_id } = require('../services/profileServices');
const app = expressRouter.Router();

// load configuration variables

const upload = multer({ storage: multer.memoryStorage() });

app.get('/view', canRead('read'), async (req, res) => {
    try {
        const { profileId } = extractToken(req?.headers?.authorization?.split('Bearer ')[1]);
        const profile_data = await get_profile_by_id(profileId);
        const _is_admin = await isAdmin(req, res);
        const products_data = _is_admin == true ? await get_product({}) : await get_product({ groupId: profile_data?.groupId?._id });
    
        if(!_.isEmpty(products_data)) return apiResponse.successResponseWithData(res, "Products information", products_data);
        else return apiResponse.ErrorResponse(res, "Sorry, no Products data exists");
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.get('/view/:id', canRead('read'), async (req, res) => {
    try {
        const _id = req.params.id;
        const products_data = await get_product_by_id(_id);
    
        if(!_.isEmpty(products_data)) return apiResponse.successResponseWithData(res, "Product information", products_data);
        else return apiResponse.ErrorResponse(res, "Sorry, no Products data exists");
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
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
        
        const _product_sub_product_data = sheetData?.length > 0 ? [...new Set(sheetData?.map((_product, _idx) => ({
            id: _idx + 1,
            sub_product_name: _product?.['Product Sub type'],
            sub_product_code: _.sampleSize("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", 4).join(""),
        })))] : []

        const _subCategories = await createSubCategories(_product_sub_product_data);
        
        const _product_product_data = sheetData?.length > 0 ? [...new Set(sheetData?.map((_product, _idx) => ({
            id: _idx + 1,
            product_name: _product?.['Product'],
            product_code: _.sampleSize("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", 4).join(""),
            sub_product: _subCategories?.find((x) => x?.sub_product_name == _product?.['Product Sub type'])?._id,
        })))] : []

        const _productCategories = await createCategories(_product_product_data);

        const _products_data = sheetData?.length > 0 ? [...new Set(sheetData?.map((_product, _idx) => ({ 
            id: _idx + 1, 
            product_name: _product?.['Product'], 
            product_code: _.sampleSize("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", 6).join(""),
            unit_price: _product?.['MRC'],
            description: _product?.['Rate plan'],
            tax: ["68266051cccf81ad64d0709d"],
            product_type: _productTypes?.find((x) => x?.type_name == _product?.['Product Type'])?._id,
            product_product: _productCategories?.find((x) => x?.product_name == _product?.['Product'])?._id,
            product_sub_product: _subCategories?.find((x) => x?.sub_product_name == _product?.['Product Sub type'])?._id,
        })))] : []

        const _produtcs = await createMany(_products_data);

        return apiResponse.successResponseWithData(res, "Products imported", _produtcs);
    } catch (error) {
        return apiResponse.ErrorResponse(res, "Error importing data" + error?.message);
    }

});

app.post('/create', canCreate('create'), async (req, res) => {
    try {
        let products_data = req.body;
        const { profileId } = extractToken(req?.headers?.authorization?.split('Bearer ')[1]);
        const profile_data = await get_profile_by_id(profileId);
    
        if(!_.isEmpty(products_data)) {
            const [_existing_products] = await get_product({ product_code: products_data?.product_code });
            if(_.isEmpty(_existing_products)) { 
                products_data['id'] = await getNextSequence('products');
                products_data['profileId'] = profile_data?._id;
                products_data['groupId'] = profile_data?.groupId?._id;
                const _new_products = await create(products_data);
        
                if(!_.isEmpty(_new_products)) return apiResponse.successResponseWithData(res, "New Products Created Successfully.", _new_products);
                else apiResponse.ErrorResponse(res, "Unable to create new products.");
            } else apiResponse.ErrorResponse(res, "Products already exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", products_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/update', canUpdate('update'), async (req, res) => {
    try {
        const products_data = req.body;
    
        if(!_.isEmpty(products_data)) {
            const _existing_products = await get_product_by_id(products_data?.id);
            if(!_.isEmpty(_existing_products)) {
                const _updated_products = await update_product(products_data?.id, _.omit(products_data, ['id']));
        
                if(!_.isEmpty(_updated_products)) return apiResponse.successResponseWithData(res, "Products Updated Successfully.", _updated_products);
                else apiResponse.ErrorResponse(res, "Unable to update products.");
            } else apiResponse.ErrorResponse(res, "Products doesnot exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", products_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.patch('/update/:id', canUpdate('update'), async (req, res) => {
    try {
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
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/delete', canDelete('delete'), async (req, res) => {
    try {
        const products_data = req.body;
    
        if(!_.isEmpty(products_data)) {
            const _existing_products = await get_product_by_id(products_data?.id);
            if(!_.isEmpty(_existing_products)) {
                const _deleted_products = await delete_product(products_data?.id);
        
                if(!_.isEmpty(_deleted_products)) return apiResponse.successResponseWithData(res, "Products Deleted Successfully.", _deleted_products);
                else apiResponse.ErrorResponse(res, "Unable to delete products.");
            } else apiResponse.ErrorResponse(res, "Products doesnot exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", products_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/bulk-delete', canDelete('delete'), async (req, res) => {
    try {
        const product_data = req.body;
    
        if(!_.isEmpty(product_data)) {
            const _deleted_product = await delete_Many({ _id: { $in: product_data?.ids?.map(id => ObjectId.createFromHexString(id)) }});
            if(!_.isEmpty(_deleted_product)) return apiResponse.successResponseWithData(res, "Product Deleted Successfully.", _deleted_product);
            else apiResponse.ErrorResponse(res, "Unable to delete product.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", product_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

module.exports.productsController = app;