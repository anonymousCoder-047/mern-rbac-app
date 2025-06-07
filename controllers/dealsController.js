
// load dependencies
const moment = require('moment');
const _ = require('lodash');
const multer = require('multer');
const xlsx = require("xlsx");
const { DateTime } = require("luxon");

// loading validators

const { canCreate, canRead, canUpdate, canDelete } = require('../middlewares/permissionMiddleware');
const { get_contacts } = require("../services/contactsServices")
const { get_company } = require("../services/companyServices")
const { get_product } = require("../services/productsServices")

// loading database service
const { getNextSequence } = require('../helpers/incrementCount');
const { create, createMany, delete_deals, get_deals, get_deals_by_id, update_deals } = require('../services/dealsServices');

const apiResponse = require('../helpers/apiResponse');
const expressRouter = require('express');
const app = expressRouter.Router();

const upload = multer({ storage: multer.memoryStorage() });
// load configuration variables

app.get('/view', canRead('read'), async (req, res) => {
    const deals_data = await get_deals({});

    if(!_.isEmpty(deals_data)) return apiResponse.successResponseWithData(res, "deals information", deals_data);
    else return apiResponse.ErrorResponse(res, "Sorry, no deals data exists");
});

app.post('/bulk', canCreate('create'), upload.single('deals'), async (req, res) => {
    try {
        const _products = await get_product({});
        const _contacts = await get_contacts({});
        const _companies = await get_company({});

        const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames?.find((x) => x == "Etisalat Pipeline"); // Read the first sheet
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]); // Convert sheet to JSON
        const formats = ["dd/MM/yyyy", "MM/dd/yyyy", "yyyy-MM-dd", "d/M/yyyy"];

        const parseDate = (dateString) => {
            return _.chain(formats)
                .map(format => DateTime.fromFormat(dateString, format, { zone: "Asia/Dubai" }))
                .find(dt => dt.isValid)
                .thru(dt => dt ? dt.toISO() : null)
                .value();
        };

        const _deals_data = [...new Set(sheetData?.map((x, idx) => ({ 
            id: idx, 
            opportunity_name: x?.['CP Name'],
            start_date: x?.['Started Date'] ? typeof x?.['Started Date'] !== 'string' ? moment(new Date((x?.['Started Date'] - 25569) * 86400000).toISOString()) : moment(parseDate(x?.['Started Date']))?.format("YYYY-MM-DD") : "",
            updated_date: x?.['Date Updated'] ? typeof x?.['Date Updated'] !== 'string' ? moment(new Date((x?.['Date Updated'] - 25569) * 86400000).toISOString()) : moment(parseDate(x?.['Date Updated']))?.format("YYYY-MM-DD") : "",
            contact_name: _contacts?.find((_x) => _x?.first_name == x?.['SALES_ID'])?._id,
            company_name: _companies?.find((_x) => _x?.company_name == x?.['Company Name'])?._id,
            sr_type: x?.['SR Type'],
            product_category: _products?.find((_x) => _x?.product_name == x?.['Product Category'])?._id,
            closing_date: x?.['Expected Closure Date'] ? typeof x?.['Expected Closure Date'] !== 'string' ? moment(new Date((x?.['Expected Closure Date'] - 25569) * 86400000).toISOString()) : moment(parseDate(x?.['Expected Closure Date']))?.format("YYYY-MM-DD") : "",
            stage: "68342cc734abe977eb40f162",
            amount: x?.["MRC"],
            team_leader: _contacts?.find((_x) => _x?.first_name == x?.['Manager'])?._id,
            comments: x?.['COMMENTS'],
            last_contact_date: x?.['Last contacted date'] ? typeof x?.['Last contacted date'] !== 'string' ? moment(new Date((x?.['Last contacted date'] - 25569) * 86400000).toISOString()) : moment(parseDate(x?.['Last contacted date']))?.format("YYYY-MM-DD") : "",
            order_number: _.sampleSize("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", 4).join(""),
            description: x?.['Product Description'],
            qty: x?.['QTY'],
        })))]
        const _new_deals = await createMany(_deals_data);
    
        if(!_.isEmpty(_new_deals)) return apiResponse.successResponseWithData(res, "New Deals Created Successfully.", _new_deals);
        else apiResponse.ErrorResponse(res, "Unable to create new deals.");
    } catch(err) {
        console.log("error ", err);
        return apiResponse.ErrorResponse(res, "Error while creating deals -- " + err)
    }
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