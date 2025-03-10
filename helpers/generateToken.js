

// load dependencies
const _ = require('lodash');
const jwt = require('jsonwebtoken');

// load configurations 
const { access_token_secret, refresh_token_secret } = require('../config/config');

// function to generate token

const generateAccessToken = (usr) => {
    try {
        if(!_.isEmpty(usr)) return jwt.sign(_.pick(usr, ['_id', 'username', 'email']), access_token_secret, { expiresIn: '15m' });

        else return "";
    } catch (err) {
        return err;
    }
}

const generateRefreshToken = (usr) => {
    try {
        if(!_.isEmpty(usr)) return jwt.sign(_.pick(usr, ['_id', 'username', 'email']), refresh_token_secret, { expiresIn: '7d' });

        else return "";
    } catch (err) {
        return err;
    }
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
}