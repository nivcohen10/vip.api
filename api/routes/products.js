const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const HttpStatus = require('http-status-codes');

const Product = require('../models/product');

router.get('/', (req, res, next) => {
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

    
});

module.exports = router;