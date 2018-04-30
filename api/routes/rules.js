const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const HttpStatus = require('http-status-codes');

const CustomerRepository = require('../../repository/classes/customerRepository')
const _customerRepository = new CustomerRepository();

router.get('/run/:customerId', async (req, res, next) => {
    var customer;
    try {
        var customer = await _customerRepository.FindCustomer(req.headers.partnerid, req.params.customerId);
        if (!customer) {
            res.status(HttpStatus.BAD_REQUEST).json({ error: "Customer [" + req.params.customerId + "] does not exist" })
            return;
        } else {
            // todo: call to Dumsky
            res.status(HttpStatus.OK).json({message: "call to Dumsky"})
        }
    }
    catch (err) {
        next(err)
        return;
    }
});

module.exports = router;