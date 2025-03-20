
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
const companyRouter = require('../controllers/companyController').companyController;
const contactsRouter = require('../controllers/contactsController').contactsController;
const taxRouter = require('../controllers/taxController').taxController;

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
app.use('/products', validateToken, checkLoggedIn, productsRouter);
app.use('/category', validateToken, checkLoggedIn, categoryRouter);
app.use('/sub-category', validateToken, checkLoggedIn, subCategoryRouter);
app.use('/type', validateToken, checkLoggedIn, typeRouter);
app.use('/sub-type', validateToken, checkLoggedIn, subTypeRouter);
app.use('/pipeline', validateToken, checkLoggedIn, pipelineRouter);
app.use('/company', validateToken, checkLoggedIn, companyRouter);
app.use('/contact', validateToken, checkLoggedIn, contactsRouter);
app.use('/tax', validateToken, checkLoggedIn, taxRouter);

module.exports = app;