
// const apiResponse = require('../helpers/apiResponse');

const express = require('express')
const app = express.Router();

// import other routes
const indexRouter = require('./indexRouter').indexRouter;
const authRouter = require('./authRouter').signupRouter;
const dashboardRouter = require('./dashboardRouter').dashboardRouter;

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/dashboard', dashboardRouter);

module.exports = app;