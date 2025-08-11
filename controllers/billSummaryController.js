
// load dependencies
const _ = require('lodash');
const multer = require('multer');
const XLSX = require('xlsx');
const axios = require('axios');

const apiResponse = require('../helpers/apiResponse');
const expressRouter = require('express');
const app = expressRouter.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

function extractInvoiceIds(buffer) {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  return _(rows)
    .flatten()
    .map((id) => _.toString(id))
    .filter(_.identity)
    .uniq()
    .value();
}

async function fetchInvoiceWithDelay(invoiceId, delayMs) {
  try {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    const response = await axios.post('https://www.etisalat.ae/b2bportal/billspayments/quickPayAccountsInfo.service', { serviceAccount: invoiceId });
    return response.data;
  } catch (err) {
    console.error(`Failed for ${invoiceId}`, err);
    return null;
  }
}

app.post('/search', upload.single('bill_file'), async (req, res) => {
    try {
        const { number } = req.body;
        const bills = req.file;
    
        if(number) {
            const id = _.startsWith(_.toString(number), '0') ? _.toString(number) : '0' + _.toString(number);
            
            const resp = await fetchInvoiceWithDelay(id, 800);
            if (resp?.accountInfo) return apiResponse.successResponseWithData(res, "Bill Summary", resp.accountInfo);
            else return apiResponse.ErrorResponse(res, "incorrect account number");
        } else if(bills) {
            const results = [];
            const accountNumbers = extractInvoiceIds(bills.buffer);
            
            for (const _id of accountNumbers) {
                const id = _.startsWith(_.toString(_id), '0') ? _.toString(_id) : '0' + _.toString(_id);
                
                const resp = await fetchInvoiceWithDelay(id, 800);
                if (resp?.accountInfo) results.push(resp.accountInfo); // Push array of invoices
            }
    
            return apiResponse.successResponseWithData(res, "Bill Summary", _.flatten(results));
        } else return apiResponse.ErrorResponse(res, "No inputs provided");
    } catch(ex) {
        return apiResponse.ErrorResponse(res, "Internal server error E: " + ex?.message);
    }
});

module.exports.billController = app;