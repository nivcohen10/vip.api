const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const HttpStatus = require('http-status-codes');
const Partner = require('../../repository/models/partner');

router.get('/', (req, res, next) => {
    Partner.find()
        .exec()
        .then(docs => {
            res.status(HttpStatus.OK).json(docs);
        })
        .catch(err => {
            next(err);
        })
});

router.post('/', (req, res, next) => {
    Partner.find({ partnerId: req.body.partnerId })
        .exec()
        .then(doc => {
            if (doc.length > 0) {
                res.status(HttpStatus.BAD_REQUEST).json({ error: "Partner [" + req.params.id + "] already exist" })
            }
        });
 
    const partner = new Partner({
        _id: mongoose.Types.ObjectId(),
        partnerId: req.body.partnerId,
        users: req.body.users,
        apiKey: req.body.apiKey
    });

    partner
        .save()
        .then(result => {
            console.log(result);
            res.status(HttpStatus.CREATED).json({
                message: 'partner created',
                created_partner: result
            });
        })
        .catch(err => next(err));
});

router.put('/:id', (req, res, next) => {
    const partnerId = req.params.id;
    const ojbToUpdate = req.body;
    const updateOps = {};
    for (var p in ojbToUpdate) {
        if (ojbToUpdate.hasOwnProperty(p)) {
            updateOps[p] = ojbToUpdate[p];
        }
    }
    Partner.updateOne({ partnerId: partnerId }, { $set: updateOps })
        .exec()
        .then(result => res.status(HttpStatus.OK).json(result))
        .catch(err => next(err));
});

module.exports = router;