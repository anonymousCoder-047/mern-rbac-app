
// load dependencies
const _ = require('lodash');
const { ObjectId } = require('mongodb')

// loading validators

const { canCreate, canRead, canUpdate, canDelete } = require('../middlewares/permissionMiddleware');

// loading database service
const { getNextSequence } = require('../helpers/incrementCount');
const { create, delete_tax, get_tax, get_tax_by_id, update_tax, delete_Many } = require('../services/taxServices');

const apiResponse = require('../helpers/apiResponse');
const expressRouter = require('express');
const { extractToken, isAdmin } = require('../middlewares/authMiddleware');
const { get_profile_by_id } = require('../services/profileServices');
const app = expressRouter.Router();

// load configuration variables

app.get('/view', canRead('read'), async (req, res) => {
    try {
        const { profileId } = extractToken(req?.headers?.authorization?.split('Bearer ')[1]);
        const profile_data = await get_profile_by_id(profileId);
        const _is_admin = await isAdmin(req, res);
        const tax_data = _is_admin == true ? await get_tax({}) : await get_tax({ groupId: profile_data?.groupId?._id });
    
        if(!_.isEmpty(tax_data)) return apiResponse.successResponseWithData(res, "Tax information", tax_data);
        else return apiResponse.ErrorResponse(res, "Sorry, no Tax data exists");
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/create', canCreate('create'), async (req, res) => {
    try {
        let tax_data = req.body;
        const { profileId } = extractToken(req?.headers?.authorization?.split('Bearer ')[1]);
        const profile_data = await get_profile_by_id(profileId);
    
        if(!_.isEmpty(tax_data)) {
            const [_existing_tax] = await get_tax({ tax_code: tax_data?.tax_name });
            if(_.isEmpty(_existing_tax)) { 
                tax_data['id'] = await getNextSequence('tax');
                tax_data['profileId'] = profile_data?._id;
                tax_data['groupId'] = profile_data?.groupId?._id;
                const _new_tax = await create(tax_data);
        
                if(!_.isEmpty(_new_tax)) return apiResponse.successResponseWithData(res, "New Tax Created Successfully.", _new_tax);
                else apiResponse.ErrorResponse(res, "Unable to create new tax.");
            } else apiResponse.ErrorResponse(res, "Tax already exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", tax_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/update', canUpdate('update'), async (req, res) => {
    try {
        const tax_data = req.body;
    
        if(!_.isEmpty(tax_data)) {
            const _existing_tax = await get_tax_by_id(tax_data?.id);
            if(!_.isEmpty(_existing_tax)) {
                const _updated_tax = await update_tax(tax_data?.id, _.omit(tax_data, ['id']));
        
                if(!_.isEmpty(_updated_tax)) return apiResponse.successResponseWithData(res, "Tax Updated Successfully.", _updated_tax);
                else apiResponse.ErrorResponse(res, "Unable to update tax.");
            } else apiResponse.ErrorResponse(res, "Tax doesnot exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", tax_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.patch('/update/:id', canUpdate('update'), async (req, res) => {
    try {
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
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/delete', canDelete('delete'), async (req, res) => {
    try {
        const tax_data = req.body;
    
        if(!_.isEmpty(tax_data)) {
            const _existing_tax = await get_tax_by_id(tax_data?.id);
            if(!_.isEmpty(_existing_tax)) {
                const _deleted_tax = await delete_tax(tax_data?.id);
        
                if(!_.isEmpty(_deleted_tax)) return apiResponse.successResponseWithData(res, "Tax Deleted Successfully.", _deleted_tax);
                else apiResponse.ErrorResponse(res, "Unable to delete tax.");
            } else apiResponse.ErrorResponse(res, "Tax doesnot exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", tax_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/bulk-delete', canDelete('delete'), async (req, res) => {
    try {
        const tax_data = req.body;
    
        if(!_.isEmpty(tax_data)) {
            const _deleted_tax = await delete_Many({ _id: { $in: tax_data?.ids?.map(id => ObjectId.createFromHexString(id)) }});
            if(!_.isEmpty(_deleted_tax)) return apiResponse.successResponseWithData(res, "Tax Deleted Successfully.", _deleted_tax);
            else apiResponse.ErrorResponse(res, "Unable to delete tax.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", tax_data);
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

module.exports.taxController = app;