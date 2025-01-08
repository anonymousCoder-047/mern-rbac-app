
// load dependencies
const _ = require('lodash');
const bcrypt = require('bcryptjs');

// load configurations 

// load sub modules
const { get_users } = require('../services/userServices');
const apiResponse = require('../helpers/apiResponse');

async function userLogin(req, res, next) {
    try {
        const { username, password } = req.body;
        let _query_field_name = username.includes('@') ? 'email' : 'username';
        const [ _existing_usr ] = await get_users({ [_query_field_name]: username })

        if(_.isEmpty(_existing_usr)) return apiResponse.ErrorResponse(res, "Sorry! user does not exist! please signup.");  
            
        const passwordMatched = await bcrypt.compare(password, _existing_usr.password);
        if(!passwordMatched) return apiResponse.ErrorResponse(res, "Sorry! Incorrect username/password.");

        next();
    } catch(error) {
        return apiResponse.ErrorResponse(res, "Sorry! unable to authenticate user " + error)
    }
}

const checkLoggedIn = async (req, res, next) => {
  console.log("session --> ", req.session);
  if (!req.session.user) return apiResponse.ErrorResponse(res, "Please login.");
  else {
    const _session = req.session?.user;
    if(!_.isEmpty(_session)) {
      const [ _existing_user ] = await get_users({ 'username': _session?.username });
      if(_.isEmpty(_existing_user)) return apiResponse.ErrorResponse(res, "User doesnt esxist.");
      else return next(); 
    } else return apiResponse.ErrorResponse(res, "Sorry! invalid token.");
  }
}

// Middleware to check if session has expired
const activeSession = ((req, res, next) => {
    if (req.session) {
      // Check if session has expired
      if (!req.session.cookie.expires || new Date() > req.session.cookie.expires) {
        req.session.destroy((err) => {
          if (err) {
            return apiResponse.ErrorResponse(res, "Error in destroying session");
          }
          return apiResponse.successResponse(res, "Sorry! session timedout, please login.");
        });
      } else {
        next();
      }
    } else {
      next();
    }
});

module.exports = {
    userLogin,
    checkLoggedIn,
    activeSession
};