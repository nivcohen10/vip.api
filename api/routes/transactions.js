const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const HttpStatus = require('http-status-codes');

const Transaction = require('../models/transaction');

router.get('/', (req, res, next) => {
    Transaction.find()
    .exec()
    .then(docs => {
            res.status(HttpStatus.OK).json(docs);
    })
    .catch(err => next(err))
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
            message: 'transaction created',
            created_transaction: result
        });
    })
    .catch(err => next(err));
});

module.exports = router;