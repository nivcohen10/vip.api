const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const HttpStatus = require('http-status-codes');

const app = express();

const productRoutes = require('./api/routes/products');
const transactionsRoutes = require('./api/routes/transactions');


mongoose.connect('mongodb://node-api:node-api@node-api-shard-00-00-fasjx.mongodb.net:27017,node-api-shard-00-01-fasjx.mongodb.net:27017,node-api-shard-00-02-fasjx.mongodb.net:27017/test?ssl=true&replicaSet=node-api-shard-0&authSource=admin',);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use ((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET ,PUT ,POST');  
        return res.status(HttpStatus.OK).json({});
    }
    next();
});

app.use('/products',productRoutes);
app.use('/transactions',transactionsRoutes);


app.use((req, res, next) => {
    const error = new Error ('Not Found');
    error.status = HttpStatus.NOT_FOUND;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
    .json({
        error: {
            message: error.message
        }
    }); 
});

module.exports = app;