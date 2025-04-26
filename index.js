
// loading core modules
const path = require('path')

// loading dependencies
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
// const { v4: uuid } = require('uuid');
const MongoStoreRateLimit = require('rate-limit-mongo');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

// loading sub-modules
const apiResponse = require('./helpers/apiResponse');
const routes = require('./routes/routes');

// creating express instance
const app = express();

// setting related setting for express server
app.set('trust proxy', 1); // Trust first proxy

// defining or loading any configurations for any modules
const { 
    env, 
    db_url, 
    rate_limit_time_in_sec,
    max_rate_limit,
} = require('./config/config')

const corsConfig = {
	origin: true,
	credentials: true,
};

const limiter = rateLimit({
    windowMs: parseInt(rate_limit_time_in_sec),
    max: parseInt(max_rate_limit),
    message: async (req, res) => {
		return apiResponse.rateLimitExceededResponse(res, `You can only make ${max_rate_limit} requests every ${(rate_limit_time_in_sec/1000/60)}min`)
	},
    legacyHeaders: false,
    standardHeaders : true,
    store: new MongoStoreRateLimit({
        uri: db_url,
        expireTimeMs: rate_limit_time_in_sec,
        errorHandler: console.error.bind(null, 'rate-limit-mongo')
    }),
});

// linking all middlewares
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('tiny'))
app.use(cors(corsConfig))
app.options("*", cors(corsConfig))
app.use(limiter)
app.use(cookieParser())

// Serve static files (CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

//don't show the log when it is test
if (env !== "prod") {
    mongoose.set('debug', true)
	mongoose.connect(db_url).then(() => {
		//don't show the log when it is prod
        console.log("Connected to DB");
        console.log("App is running ... \n");
        console.log("Press CTRL + C to stop the process. \n");
	}).catch(err => {
		console.error("App starting error:", err.message);
		process.exit(1);
	});
} else {
	mongoose.connect(db_url).then(() => {}).catch(err => {
		console.error("App starting error:", err.message);
		process.exit(1);
	});
}

// redirect routes to routes file
app.use('/', routes);

if (env != 'prod') {
    // throw 404 if URL not found
    app.all("*", function (req, res) {
        return apiResponse.notFoundResponse(res, "Page not found");
    });

    app.use((err, req, res) => {
        if (err.name === "UnauthorizedError") {
            return apiResponse.unauthorizedResponse(res, err.message);
        }
    });
} else {
    app.use((req, res, next)=>{
        if(rec.secure) { 
            next();
        } else {
            res.redirect('https://'+req.hostname+req.url);
        }
    });

    // throw 404 if URL not found
    app.all("*", function (req, res) {
        return apiResponse.notFoundResponse(res, "Page not found");
    });

    app.use((err, req, res, next) => {
        res.status(500).send('Server Error');
    });
}

module.exports = app;
