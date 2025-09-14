
// load dependencies
const _ = require('lodash');
const axios = require('axios');

const apiResponse = require('../helpers/apiResponse');
const expressRouter = require('express');
const app = expressRouter.Router();

async function GenerateOTP() {
    try {
        const _otp = await axios.post("https://channelpartners.etisalat.ae/productdatalayer/PCRevamp/WebService.asmx/GenerateOTP", {
            "OTPPageParameters": {
                "UserName": "MLG10001",
                "Password": "Mustangsmb8$",
                "TokenId": "1",
                "ActionType": 1
            }
        });

        if(!_.isEmpty(_otp)) return _otp;
        else return {};
    } catch(ex) {
        console.log("error generating otp --- ", ex);

        return {}
    }
}

async function KillPreviousSession() {
    try {
        const _killed = await axios.post("https://channelpartners.etisalat.ae/productdatalayer/PCRevamp/WebService.asmx/KillPortalUserSession", {
            "OTPPageParameters": {
                "UserName": "MLG10001",
                "ActionType": 1
            }
        });

        if(!_.isEmpty(_killed)) return _killed;
        else return {};
    } catch(ex) {
        console.log("error failed to kill session --- ", ex);
        
        return {};
    }
}

async function Login(_otp){
    try {
        console.log("loggin in now ---- ", _otp);
        const { data } = await axios.post("https://channelpartners.etisalat.ae/CPP.WebApi/api/PageManagement/LoginService", {
            "UserName": "MLG10001",
            "Password": "Mustangsmb8$",
            "TokenId": _otp,
            "ActionType": 1,
            "AuthData": "",
            "paramq": "username=MLG10001&password=%7B%22iv%22%3A%22zfGqK6slxtWg8yDLbfoxFQ%22%2C%22v%22%3A1%2C%22iter%22%3A1000%2C%22ks%22%3A256%2C%22ts%22%3A64%2C%22mode%22%3A%22ccm%22%2C%22adata%22%3A%22%22%2C%22cipher%22%3A%22aes%22%2C%22salt%22%3A%22UgrF1TMKAXM%22%2C%22ct%22%3A%22UymR9bd0L1C6oNGKZJzbwoAiuAU%22%7D&grant_type=password&scope=etisalat_web_api"
        })
        
        console.log("logged in ---- ", data);
        if(!_.isEmpty(data)) return data;
        else return {};
    } catch(ex) {
        console.log("error failed to login --- ", ex);
        
        return {};
    }
}

// =======================
// Fetch All Paginated Data (returns JSON)
// =======================
async function fetchAllCustomersData(_token, baseUrl, searchText, pageSize = 5) {
    let allRecords = [];
    let page = 1;
    let skip = (page - 1) * pageSize; // translate page → skip
    let totalCount = 0;
    let columnHeaders = [];

    // =======================
    // Axios Instance
    // =======================
    const api = axios.create();
    api.interceptors.request.use(async (config) => {
        config.headers.Authorization = `Bearer ${_token}`;

        return config;
    });

    try {
        console.log("fetching customer data -- ");
        while (true) {
            const response = await api.post(baseUrl, {
                "pagedCriteria": null,
                "ddlLookInSelectedValue": "9dbe830b-f6e8-46f0-b548-7f3cf421050c",
                "ddlLookForSelectedValue": "account",
                "isNewSearch": false,
                "AttributeSchemaName": "dot_customer",
                "SchemaName": "dot_customer",
                "TargetEntities": [
                    "account"
                ],
                "TargetEntityFilter": null,
                "AttributeTypeCode": 6,
                "AdditionalLookupFilter": null,
                "AdditionalLookupFilterValue": null,
                "quickSearchText": searchText,
                "Skip": skip,
                "Sort": [
                    {
                    "Field": "dot_customerid",
                    "Dir": "asc"
                    }
                ],
                "Take": pageSize,
            });

            const data = response?.data;

            if (!totalCount) totalCount = data?.TotalRecordCount || 0;
            if (_.isEmpty(columnHeaders) && data?.ColumnHeaders) {
                columnHeaders = data?.ColumnHeaders; // save only once
            }

            let records = [];
            try {
                records = JSON.parse(data?.ListingData || "[]");
            } catch (err) {
                console.error("❌ Error parsing ListingData:", err);
            }

            if (_.isEmpty(records)) break;

            allRecords = _.concat(allRecords, records);
            console.log(
                `📦 Page ${page} fetched → ${allRecords.length}/${totalCount}`
            );

            if (allRecords.length >= totalCount) break;

            ++page;
            skip = (page - 1) * pageSize;
        }

        return {
            total: totalCount,
            columns: columnHeaders,
            data: allRecords,
        };
    } catch (err) {
        console.error("❌ Error fetching customers:", err.message);
        throw err;
    }
}

// =======================
// Function: fetch party info for one customer
// =======================
async function fetchCustomerPartyInfo(apiUrl, searchString) {
  try {
    const response = await axios.post(apiUrl, { 
        "filter": `{\"filter\":\"dot_name\",\"filterText\":\"${searchString}\",\"userId\":\"f176f84b-442f-ed11-9127-005056b25ebd\"}`
     }); // adjust if GET or query params
    if (!response.data || !response.data.d) {
      return null;
    }

    console.log( `📦 Fetching partyId for [${searchString}]`);
    const parsed = JSON.parse(response.data.d); // because API returns stringified JSON

    return parsed;
  } catch (err) {
    console.error(`❌ Error fetching party info for "${searchString}":`, err.message);
    return null;
  }
}

// =======================
// Function: Enrich full customer list
// =======================
async function fetchCustomerPartyId(customers, partyApiUrl) {
  const enriched = await Promise.allSettled(
    customers.map(async (cust) => {
      try {
        const searchKey = cust.name || ""; // fallback to empty string if name is missing
        const extra = await fetchCustomerPartyInfo(partyApiUrl, searchKey);

        return {
          ...cust,
          partyInfo: extra || null, // ensure it's null if no data
        };
      } catch (err) {
        return {
          ...cust,
          partyInfo: null, // ensure customer still exists but with null data
        };
      }
    })
  );

  // Always return all customers, successful or not
  return enriched.map((r) =>
    r.status === "fulfilled"
      ? r.value
      : {
          ...customers[enriched.indexOf(r)], // fallback to original customer
          partyInfo: null,
        }
  );
}

// =======================
// Function: fetch party info for one customer
// =======================
async function fetchCustomerContactInfo(_token, apiUrl, searchString, page = 1, pageSize = 5) {
  try {
    const skip = (page - 1) * pageSize; // translate page → skip
    // =======================
    // Axios Instance
    // =======================
    const api = axios.create();
    api.interceptors.request.use(async (config) => {
        config.headers.Authorization = `Bearer ${_token}`;

        return config;
    });

    const response = await api.post(apiUrl, { 
        "pagedCriteria": null,
        "ddlLookInSelectedValue": "f5d62a89-7084-ea11-9114-005056b2521c",
        "ddlLookForSelectedValue": "contact",
        "isNewSearch": true,
        "AttributeSchemaName": "parentcustomerid",
        "SchemaName": "parentcustomerid",
        "TargetEntities": [
            "account",
            "contact"
        ],
        "TargetEntityFilter": null,
        "AttributeTypeCode": 1,
        "AdditionalLookupFilter": null,
        "AdditionalLookupFilterValue": null,
        "quickSearchText": searchString,
        "Skip": skip,
        "Sort": [],
        "Take": pageSize
     }); // adjust if GET or query params
    if (!response?.data || !response?.data?.ListingData) {
      return null;
    }

    console.log( `📦 Fetching contact info for [${searchString}]`);
    const parsed = JSON.parse(response?.data?.ListingData); // because API returns stringified JSON
    // Extract headers
    // const columnHeaders = response.data?.ColumnHeaders || [];

    return parsed;
  } catch (err) {
    console.error(`❌ Error fetching customner info for "${searchString}":`, err.message);
    return null;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchCustomerContacts(_token, partyApiUrl, existingCustomers = []) {
  try {
    const enriched = await Promise.allSettled(
      existingCustomers.map(async (cust, idx) => {
        try {
          await sleep(800);
          const searchKey = cust.name || ""; // fallback if name missing
          const extra = await fetchCustomerContactInfo(_token, partyApiUrl, searchKey, idx);

          return {
            ...cust,
            contactInfo: extra || null, // ensure null if no data
          };
        } catch (err) {
          return {
            ...cust,
            contactInfo: null, // customer still included with null
          };
        }
      })
    );

    // Always return all customers, successful or not
    const mergedCustomers = enriched.map((r, idx) =>
      r.status === "fulfilled"
        ? r.value
        : {
            ...existingCustomers[idx],
            contactInfo: null,
          }
    );

    // Merge headers safely
    // const mergedHeaders = enriched
    //   .filter((r) => r.status === "fulfilled" && r.value?.contactInfo?.ColumnHeaders)
    //   .flatMap((r) => r.value.contactInfo.ColumnHeaders || []);

    return mergedCustomers;
  } catch (error) {
    console.error("❌ Error fetching customer contacts:", error.message);
    return existingCustomers?.map(c => ({ ...c, contactInfo: null }));
  }
}

app.post('/gen-otp', async (req, res) => {
    try {
        const _get_otp = await GenerateOTP();
        console.log("OTP generated -- ", _get_otp);
        const _session_killed = await KillPreviousSession();
        console.log("Session Killed -- ", _session_killed);
        if(!_.isEmpty(_session_killed) && !_.isEmpty(_get_otp)) return apiResponse.successResponse(res, "OTP generated");
        else return apiResponse.badRequestResponse(res, "Unable generate OTP ", _get_otp);
    } catch(ex) {
        return apiResponse.ErrorResponse(res, "Internal server error E: " + ex?.message);
    }
})

app.post('/get-token', async (req, res) => {
    try {
        const { TokenId } = req.body;
        if(TokenId) {
            const _get_token = await Login(TokenId);

            if(!_.isEmpty(_get_token)) return apiResponse.successResponseWithData(res, "Token generated", _get_token);
            else return apiResponse.badRequestResponse(res, "failed to generate token ", _get_token);
        } else return apiResponse.badRequestResponse(res, "Incorrect / OTP not provided ", TokenId);
    } catch(ex) {
        return apiResponse.ErrorResponse(res, "Internal server error E: " + ex?.message);
    }
})

app.post('/search', async (req, res) => {
    try {
        const { token: _token, quickSearchText } = req.body;
        
        if(_token) {
            let _customer_data = await fetchAllCustomersData(_token, "https://channelpartners.etisalat.ae/CPP.WebApi/api/PortalModuleRecordViewEditAdd/GetLookupPagedData", quickSearchText)
    
            if(!_.isEmpty(_customer_data)) {
                const _customer_party_ids = await fetchCustomerPartyId(_customer_data?.data, "https://channelpartners.etisalat.ae/productdatalayer/PCRevamp/WebService.asmx/fetchPartiesforTawasul");

                _customer_data['data'] = _customer_party_ids;
                if(!_.isEmpty(_customer_party_ids)) {
                    const _customer_contact_data = await fetchCustomerContacts(_token, "https://channelpartners.etisalat.ae/CPP.WebApi/api/PortalModuleRecordViewEditAdd/GetLookupPagedData", _customer_party_ids);
                    _customer_data['data'] = _customer_contact_data;

                    if(!_.isEmpty(_customer_contact_data)) return apiResponse.successResponseWithData(res, "Customer data ", _customer_data);
                    else return apiResponse.badRequestResponse(res, "Unable to fetch customer contact data ", _customer_contact_data);
                } else return apiResponse.badRequestResponse(res, "Unable to fetch party id data ", _customer_party_ids);
            } else return apiResponse.badRequestResponse(res, "Unable to fetch customer data ", _customer_data);
        } else return apiResponse.badRequestResponse(res, "Token no provided");
    } catch(ex) {
        return apiResponse.ErrorResponse(res, "Internal server error E: " + ex?.message);
    }
});

module.exports.customerPartyIDController = app;