const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const HttpStatus = require('http-status-codes');

const User = require('../models/user');

router.get('/', (req, res, next) => {
    //console.log(req.headers.clientid);
    User.find()
        .exec()
        .then(docs => {
            if (docs.length > 0){
                res.status(HttpStatus.OK).json(docs);
            }
            else{
                next();
            }
        })
        .catch(err => {
             next(err);
        })
});

router.post('/:id', (req, res, next) => {
    
    console.log(req.params.id);
    User.find({userId: req.params.id})
        .exec()
        .then(doc => {
            if (doc.length > 0){
                res.status(HttpStatus.BAD_REQUEST).json({error: "User [" + req.params.id + "] already exist"})
            }
        });

    const user = new User ({
        _id: mongoose.Types.ObjectId(),
        userId: req.params.id,
        clientId: 123,
        country: req.body.country,
        tierId: 0,
        extraDetails : req.body.extraDetails,
        createDate: Date.now(),
        updateDate: Date.now()
    });

    user
        .save()
        .then(result => {
            console.log(result);
            res.status(HttpStatus.CREATED).json({
                message: 'Handling POST requests to /users',
                created_user: result
            });
        })
    .catch(err => console.log(err));
});

router.put('/:id', (req, res, next) => {
    const userId = req.params.id;
    const updateOps = {};
    console.log(req.body);
    req.body.forEach(element => {
        updateOps[element.propName] = element.value;
    });
    User.update({userId: userId}, {$set: updateOps}).exec()
    .then(result => res.status(HttpStatus.OK).json(result))
    .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: err}));
});

// Product Example
/* router.get('/', (req, res, next) => {
    Product.find()
    .select("name price _id")
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                     name: doc.name,
                     price: doc.price,
                     id: doc._id,
                     request: {
                         method: "GET",
                         url: 'http://localhost:3000/products/' + doc._id 
                     }
                }
            })
        }
        if (docs.length > 0){
            res.status(HttpStatus.OK).json(response);
        }
        else{
            next();
        }
    })
    .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: err}))
});

router.get('/:productId', (req, res, next) => {
    Product.findById(req.params.productId).exec()
    .then(doc => {
        if (doc){ res.status(HttpStatus.OK).json(doc)}
        else {res.status(HttpStatus.NOT_FOUND).json({})}
    })

    .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: err}));
});

router.delete('/:productId', (req, res, next) => {
    Product.findByIdAndRemove(req.params.productId).exec()
    .then(result => {
        console.log(req.params.productId + " deleted");
        res.status(HttpStatus.OK).json(result)
    })
    .catch(err => 
        {
            console.log(req.params.productId + " error")
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: err})
        })
});

router.put('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    console.log(req.body);
    req.body.forEach(element => {
        updateOps[element.propName] = element.value;
    });
    Product.update({_id: id}, {$set: updateOps}).exec()
    .then(result => res.status(HttpStatus.OK).json(result))
    .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: err}));
});

router.post('/', (req, res, next) => {
    const product = new Product ({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product.save()
    .then(result => {
        console.log(result);
        res.status(HttpStatus.CREATED).json({
            message: 'Handling POST requests to /products',
            created_product: result
        });
    })
    .catch(err => console.log(err));

    
}); */

module.exports = router;