
// load dependencies
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// load configurations 
const { access_token_secret } = require('../config/config');

// load sub modules
const { get_users, get_user_by_id } = require('../services/userServices');
const apiResponse = require('../helpers/apiResponse');

async function userLogin(req, res, next) {
    try {
        const { email, password } = req.body;
        let _query_field_name = email.includes('@') ? 'email' : 'username';
        const [ _existing_usr ] = await get_users({ [_query_field_name]: email })

        if(_.isEmpty(_existing_usr)) return apiResponse.ErrorResponse(res, "Sorry! user does not exist! please signup.");  
            
        const passwordMatched = await bcrypt.compare(password, _existing_usr.password);
        if(!passwordMatched) return apiResponse.ErrorResponse(res, "Sorry! Incorrect username/password.");

        next();
    } catch(error) {
        return apiResponse.ErrorResponse(res, "Sorry! unable to authenticate user " + error)
    }
}

const checkLoggedIn = async (req, res, next) => {
  try {
    if (req.headers) {
      // Check if the token is valid
      const { authorization } = req.headers;
      const _token = authorization?.split(' ')[1]; 
      const accessToken = jwt.verify(_token, access_token_secret);

      if(accessToken && !_.isEmpty(accessToken)) {
        const _existing_user = await get_user_by_id(accessToken?._id);
        if(_.isEmpty(_existing_user)) return apiResponse.ErrorResponse(res, "Invalid Token");
        else return next(); 
      } else return apiResponse.ErrorResponse(res, "Sorry! invalid token.");
    }
  } catch (err) {
    return apiResponse.ErrorResponse(res, "Please provide Token E:" + err);
  }
}

const extractToken = (_token) => {
  try {
    return jwt.verify(_token, access_token_secret);
  } catch (err) { 
    return err;
  }
} 

// Middleware to check if bearer token is correct
const validateToken = ((req, res, next) => {
  try {
    if (req.header) {
      // Check if the token is valid
      const { authorization } = req.headers;
      const _token = authorization?.split(' ')[1]; 
      const accessToken = jwt.verify(_token, access_token_secret);
      console.log(accessToken)
      
      if(accessToken && !_.isEmpty(accessToken)) {
        const { exp } = jwt.decode(_token);

        if(exp < Date.now().valueOf() / 1000) {
          return apiResponse.unauthorizedResponse(res, "Token expired");
        } else {
          return next();  
        }
      } else return apiResponse.badRequestResponse(res, "Invalid Token");
    }
  } catch (err) {
    return apiResponse.unauthorizedResponse(res, "Token Expired E:" + err?.message);
  }
});

module.exports = {
    userLogin,
    validateToken,
    checkLoggedIn,
    extractToken,
};