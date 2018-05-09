const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const HttpStatus = require('http-status-codes');
const ErrorHandler = require('./common/errorHandler')
const app = express();
const checkAuth = require('./api/middleware/check-auth')

const customersRoutes = require('./api/routes/customers');
const rulesRoutes = require('./api/routes/rules');
const partnersRoutes = require ('./api/routes/partners');

const dbName = process.env.DB_NAME || "test";
mongoose.connect('mongodb://node-api:node-api@node-api-shard-00-00-fasjx.mongodb.net:27017,node-api-shard-00-01-fasjx.mongodb.net:27017,node-api-shard-00-02-fasjx.mongodb.net:27017/'+ dbName +'?ssl=true&replicaSet=node-api-shard-0&authSource=admin', );

const _errorHandler = new ErrorHandler();

app.listen(process.env.PORT || 5000, () => {
    console.log(app.get('env'))
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET ,PUT ,POST');
        return res.status(HttpStatus.OK).json({});
    }
    next();
});

// router
//app.use('/customers', checkAuth, customersRoutes);
//app.use('/rules',checkAuth, rulesRoutes);

app.use('/customers', customersRoutes);
app.use('/rules', rulesRoutes);
app.use('/partners', partnersRoutes);

// mothed not found error
app.use((req, res, next) => {
    console.log('in method not found')
    try {
        const error = new Error('method not found');
        error.status = HttpStatus.NOT_FOUND;
        next(error);
    }
    catch (err){
        next(err);
    }
});

// log error
app.use((error, req, res, next) => {
    console.log(error.message);
    console.log(error.status);
    
    try{
        new ErrorHandler (req, error).LogError();    
        next(error);
    }
    catch (err){
        next(err);        
    }
})

// return error
app.use((error, req, res, next) => {
    console.log(error.message);
    console.log(error.status);    
        
    if (error.status && error.status != HttpStatus.INTERNAL_SERVER_ERROR){
        res.status(error.status)
        .json({
            error: {
                message: error.message
            }
        });    
    }
    else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({
            error: {
                message: "general error"
            }
        });
    }
});

module.exports = app;