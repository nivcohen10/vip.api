const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const HttpStatus = require('http-status-codes');
const ErrorHandler = require('./common/errorHandler')
const app = express();

const usersRoutes = require('./api/routes/users');
const transactionsRoutes = require('./api/routes/transactions');

const dbName = process.env.DB_NAME || "test";
mongoose.connect('mongodb://node-api:node-api@node-api-shard-00-00-fasjx.mongodb.net:27017,node-api-shard-00-01-fasjx.mongodb.net:27017,node-api-shard-00-02-fasjx.mongodb.net:27017/'+ dbName +'?ssl=true&replicaSet=node-api-shard-0&authSource=admin', );

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
app.use('/users', usersRoutes);
app.use('/transactions', transactionsRoutes);

// mothed not found error
app.use((req, res, next) => {
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