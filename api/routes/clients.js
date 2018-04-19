const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const HttpStatus = require('http-status-codes');
const Client = require('../models/client');

router.get('/', (req, res, next) => {
    console.log('in get clients');
    Client.find()
        .exec()
        .then(docs => {
                res.status(HttpStatus.OK).json(docs);
        })
        .catch(err => {
             next(err);
        })
});

router.post('/', (req, res, next) => {
    Client.find({userId: req.body.clientId})
        .exec()
        .then(doc => {
            if (doc.length > 0){
                res.status(HttpStatus.BAD_REQUEST).json({error: "Client [" + req.params.id + "] already exist"})
            }
        });

    const client = new Client ({
        _id: mongoose.Types.ObjectId(),
        clientId: req.body.clientId, 
        users: req.body.users,
        apiKey: req.body.apiKey
    });

    client
        .save()
        .then(result => {
            console.log(result);
            res.status(HttpStatus.CREATED).json({
                message: 'client created',
                created_client: result
            });
        })
    .catch(err => next(err));
});

module.exports = router;