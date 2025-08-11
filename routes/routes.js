
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
const productsRouter = require('../controllers/productsController').productsController;
const subCategoryRouter = require('../controllers/subCategoryController').subCategoryController;
const categoryRouter = require('../controllers/categoryController').categoryController;
const typeRouter = require('../controllers/typeController').typeController;
const subTypeRouter = require('../controllers/subTypeController').subTypeController;
const pipelineRouter = require('../controllers/pipelineController').pipelineController;
const dealsRouter = require('../controllers/dealsController').dealsController;
const companyRouter = require('../controllers/companyController').companyController;
const sourceRouter = require('../controllers/sourceController').sourceController;
const contactsRouter = require('../controllers/contactsController').contactsController;
const taxRouter = require('../controllers/taxController').taxController;
const billRouter = require('../controllers/billSummaryController').billController;

// loading middleware
const {
   validateToken,
   checkLoggedIn
} = require("../middlewares/authMiddleware");

const apiPrefix = '/api';

app.use(apiPrefix + '/', indexRouter);
app.use(apiPrefix + '/auth', authRouter);
app.use(apiPrefix + '/dashboard', validateToken, checkLoggedIn, dashboardRouter);
app.use(apiPrefix + '/group', validateToken, checkLoggedIn, groupRouter);
app.use(apiPrefix + '/profile', validateToken, checkLoggedIn, profileRouter);
app.use(apiPrefix + '/permissions', validateToken, checkLoggedIn, permissionsRouter);
app.use(apiPrefix + '/role', validateToken, checkLoggedIn, roleRouter);
app.use(apiPrefix + '/products', validateToken, checkLoggedIn, productsRouter);
app.use(apiPrefix + '/category', validateToken, checkLoggedIn, categoryRouter);
app.use(apiPrefix + '/sub-category', validateToken, checkLoggedIn, subCategoryRouter);
app.use(apiPrefix + '/type', validateToken, checkLoggedIn, typeRouter);
app.use(apiPrefix + '/sub-type', validateToken, checkLoggedIn, subTypeRouter);
app.use(apiPrefix + '/pipeline', validateToken, checkLoggedIn, pipelineRouter);
app.use(apiPrefix + '/deals', validateToken, checkLoggedIn, dealsRouter);
app.use(apiPrefix + '/company', validateToken, checkLoggedIn, companyRouter);
app.use(apiPrefix + '/source', validateToken, checkLoggedIn, sourceRouter);
app.use(apiPrefix + '/contact', validateToken, checkLoggedIn, contactsRouter);
app.use(apiPrefix + '/tax', validateToken, checkLoggedIn, taxRouter);
app.use(apiPrefix + '/bill', billRouter);

module.exports = app;