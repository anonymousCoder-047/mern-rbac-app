
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

  if (rows.length < 2) return [];

  const headers = rows[0].map((h, i) => {
    const key = _.snakeCase(_.toString(h).trim());
    return i === 0 ? 'invoiceId' : key || `column_${i}`;
  });

  return rows.slice(1).map((row) => {
    return headers.reduce((obj, key, i) => {
      obj[key] = _.toString(row[i] || '').trim();
      return obj;
    }, {});
  });
}

async function fetchInvoiceWithDelay(invoiceId, delayMs) {
  try {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    const response = await axios.post('https://www.etisalat.ae/b2bportal/billspayments/quickPayAccountsInfo.service', { serviceAccount: invoiceId });
    return response.data;
  } catch (err) {
    console.error(`Failed for ${invoiceId}`, err?.message);
    return null;
  }
}

// app.post('/search', upload.single('bill_file'), async (req, res) => {
//     try {
//         const { number } = req.body;
//         const bills = req.file;

//         res.setHeader('Content-Type', 'text/event-stream');
//         res.setHeader('Cache-Control', 'no-cache');
//         res.setHeader('Connection', 'keep-alive');

//         const sendProgress = (percent) => {
//             res.write(`event: progress\n`);
//             res.write(`data: ${percent}\n\n`);
//         };
    
//         if(number) {
//             const id = _.startsWith(_.toString(number), '0') ? _.toString(number) : '0' + _.toString(number);
            
//             const resp = await fetchInvoiceWithDelay(id, 100);
//             if (resp?.accountInfo) {
//               sendProgress(100);
//               res.write(`event: done\n`);
//               res.write(`data: ${JSON.stringify(resp.accountInfo)}\n\n`);
//               res.end();
              
//               return apiResponse.successResponseWithData(res, "Bill Summary", resp.accountInfo);
//             } else {
//               res.write(`event: error\n`);
//               res.write(`data: "Incorrect account number"\n\n`);
//               res.end();

//               return apiResponse.ErrorResponse(res, "incorrect account number");
//             }
//         } else if(bills) {
//             const results = [];
//             const accountNumbers = extractInvoiceIds(bills.buffer);
            
//             for (const [index, _id] of accountNumbers.entries()) {
//                 const id = _.startsWith(_.toString(_id?.invoiceId), '0') ? _.toString(_id?.invoiceId) : '0' + _.toString(_id?.invoiceId);
                
//                 const resp = await fetchInvoiceWithDelay(id, index * 30);
//                 if (resp?.accountInfo) {
//                   const accountInfoObj = _.isArray(resp.accountInfo) ? resp.accountInfo[0] : resp.accountInfo;
//                   results.push({ ..._.cloneDeep(_id), ..._.cloneDeep(accountInfoObj) }); // Push array of invoices
//                 }

//                 // Send progress
//                 const percent = Math.floor(((index + 1) / accountNumbers.length) * 100);
//                 sendProgress(percent);
//             }

//             res.write(`event: done\n`);
//             res.write(`data: ${JSON.stringify(_.flatten(results))}\n\n`);
//             res.end();
    
//             return apiResponse.successResponseWithData(res, "Bill Summary", _.flatten(results));
//         } else {
//           res.write(`event: error\n`);
//           res.write(`data: "No inputs provided"\n\n`);
//           res.end();

//           return apiResponse.ErrorResponse(res, "No inputs provided");
//         }
//     } catch(ex) {
//         res.write(`event: error\n`);
//         res.write(`data: "Internal server error: ${ex?.message}"\n\n`);
//         res.end();

//         return apiResponse.ErrorResponse(res, "Internal server error E: " + ex?.message);
//     }
// });

const jobsProgress = {}; // in-memory, for demo; in prod, use Redis or DB
const jobsResults = {};

app.post('/search', upload.single('bill_file'), async (req, res) => {
  let jobId; // declare outside try
  try {
    const { number } = req.body;
    const bills = req.file;

    jobId = Date.now().toString(); // assign inside try
    jobsProgress[jobId] = 0;
    jobsResults[jobId] = [];

    // Return immediately so frontend can start polling / SSE
    res.json({ jobId });

    // Start async processing
    if (number) {
      const id = _.startsWith(_.toString(number), '0') ? _.toString(number) : '0' + _.toString(number);
      const resp = await fetchInvoiceWithDelay(id, 100);
      jobsResults[jobId] = resp.accountInfo ? [resp.accountInfo] : [];
      jobsProgress[jobId] = 100;
    } else if (bills) {
      const accountNumbers = extractInvoiceIds(bills.buffer);

      for (const [index, _id] of accountNumbers.entries()) {
        const id = _.startsWith(_.toString(_id?.invoiceId), '0') ? _.toString(_id?.invoiceId) : '0' + _.toString(_id?.invoiceId);
        const resp = await fetchInvoiceWithDelay(id, 300);

        if (resp?.accountInfo) {
          const info = Array.isArray(resp.accountInfo) ? resp.accountInfo[0] : resp.accountInfo;
          jobsResults[jobId].push({ ..._id, ...info });
        }

        jobsProgress[jobId] = Math.round(((index + 1) / accountNumbers.length) * 100);

        // Yield to event loop so SSE can flush
        await new Promise(resolve => setImmediate(resolve));
      }

      jobsProgress[jobId] = 100;
    }
  } catch (ex) {
    console.error(ex);
    if (jobId) jobsProgress[jobId] = 100; // make sure jobId exists before using
  }
});

// Progress endpoint
app.get('/search-stream/:jobId', (req, res) => {
  const { jobId } = req.params;
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sendProgress = () => {
    const progress = jobsProgress[jobId] ?? 0;
    res.write(`data: ${JSON.stringify({ progress, results: jobsResults[jobId] })}\n\n`);
    if (progress >= 100) {
      clearInterval(interval);
      res.end();
    }
  };

  // Send initial progress immediately
  sendProgress();

  const interval = setInterval(sendProgress, 200);
});

module.exports.billController = app;