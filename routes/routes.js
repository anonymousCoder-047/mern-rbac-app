
// const apiResponse = require('../helpers/apiResponse');

const express = require('express')
const app = express.Router();

// import other routes
const indexRouter = require('../controllers/indexController').indexController;
const authRouter = require('../controllers/authController').authController;
const dashboardRouter = require('../controllers/dashboardController').dashboardController;
const groupRouter = require('../controllers/groupController').groupController;
const profileRouter = require('../controllers/profileController').profileController;
const permissionsRouter = require('../controllers/permissionController').permissionController;
const roleRouter = require('../controllers/roleController').roleController;

// loading middleware
const {
   validateToken,
   checkLoggedIn
} = require("../middlewares/authMiddleware");

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/dashboard', validateToken, checkLoggedIn, dashboardRouter);
app.use('/group', validateToken, checkLoggedIn, groupRouter);
app.use('/profile', validateToken, checkLoggedIn, profileRouter);
app.use('/permissions', validateToken, checkLoggedIn, permissionsRouter);
app.use('/role', validateToken, checkLoggedIn, roleRouter);

module.exports = app;