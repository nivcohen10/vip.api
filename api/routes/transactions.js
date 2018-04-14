const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const HttpStatus = require('http-status-codes');

const Transaction = require('../models/transaction');

router.get('/', (req, res, next) => {
    Transaction.find()
    .exec()
    .then(docs => 
        {
        if (docs.length > 0){
            res.status(HttpStatus.OK).json(docs);
        }
        else{
            next();
        }
    })
    .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: err}))
});


router.post('/', (req, res, next) => {
    const transaction = new Transaction ({
        _id: mongoose.Types.ObjectId(),
        data: req.body
    });

    transaction.save()
    .then(result => {
        console.log(result);
        res.status(HttpStatus.CREATED).json({
            message: 'Handling POST requests to /transactions',
            created_transaction: result
        });
    })
    .catch(err => console.log(err));
});

module.exports = router;