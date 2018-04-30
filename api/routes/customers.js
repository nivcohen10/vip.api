const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const HttpStatus = require('http-status-codes');
const checkAuth = require('../middleware/check-auth')
const Customer = require('../../repository/models/customer');
const CustomerRepository = require('../../repository/classes/customerRepository')
const _customerRepository = new CustomerRepository();

router.get('/', (req, res, next) => {
    _customerRepository.FindCustomers(req.headers.partnerid)
        .then(docs => {
            res.status(HttpStatus.OK).json(docs);
        })
        .catch(err => {
            next(err);
        })
});

router.get('/:id', async (req, res, next) => {
    /* Promise.all([
        Customer.findOne({ partnerId: req.headers.partnerid, customerId: req.params.id })
            .exec()
            .then(),
        Customer.find({ partnerId: req.headers.partnerid })
            .exec()
            .then()])
        .then(([customerDetails, partnerDetails]) => {
            // todo: check if need to calculate the customer results
            res.status(HttpStatus.OK).json(customerDetails.results);
        }); */
    try {
        const customer = await _customerRepository.FindCustomer(req.headers.partnerid, req.params.id);
        if (customer) {
            res.status(HttpStatus.OK).json(customer);
            return;
        }
    }
    catch (err) {
        next(err)
        return;
    }
});

router.post('/:id', async (req, res, next) => {
    try {
        const getCustomer = await _customerRepository.FindCustomer(req.headers.partnerid, req.params.id);
        if (getCustomer) {
            res.status(HttpStatus.BAD_REQUEST).json({ error: "Customer [" + req.params.id + "] already exist" })
            return;
        }
    }
    catch (err) {
        next(err)
        return;
    }

    try {
        _customerRepository.CreateNewCustomer(req).then(result => {
            res.status(HttpStatus.CREATED).json({
                message: 'customer created',
                created_customer: result
            });
        });
    } catch (error) {
        next(error)
        return;
    }
});

router.patch('/:id', async (req, res, next) => {
    var customer;
    try {
        customer = await _customerRepository.FindCustomer(req.headers.partnerid, req.params.id);
        if (!customer) {
            res.status(HttpStatus.BAD_REQUEST).json({ error: "Customer [" + req.params.id + "] does not exist" })
            return;
        }
    }
    catch (err) {
        next(err)
        return;
    }

    try {
        _customerRepository.UpdateCustomer(customer, req).then(result => {
            res.status(HttpStatus.OK).json({
                message: 'customer updated'
            });
        });
    } catch (error) {
        next(error)
        return;
    }
});

router.get('/:id/customeractions', async (req, res, next) => {
    var customer;
    try {
        var customer = await _customerRepository.FindCustomer(req.headers.partnerid, req.params.id);
        if (!customer) {
            res.status(HttpStatus.BAD_REQUEST).json({ error: "Customer [" + req.params.id + "] does not exist" })
            return;
        } else {
            res.status(HttpStatus.OK).json(customer.customerActions);
        }
    }
    catch (err) {
        next(err)
        return;
    }
});

router.get('/:id/customeractions/:customeractionId', async (req, res, next) => {
    var customer;
    try {
        var customer = await _customerRepository.FindCustomer(req.headers.partnerid, req.params.id);
        if (!customer) {
            res.status(HttpStatus.BAD_REQUEST).json({ error: "Customer [" + req.params.id + "] does not exist" })
            return;
        } else {
            var index = customer.customerActions.findIndex(c => c.customerActionId == req.params.customeractionId);
            res.status(HttpStatus.OK).json(customer.customerActions[index]);
        }
    }
    catch (err) {
        next(err)
        return;
    }
});

router.post('/:id/customeractions/:customeractionId', async (req, res, next) => {
    var customer;
    try {
        var customer = await _customerRepository.FindCustomer(req.headers.partnerid, req.params.id);
        if (!customer) {
            res.status(HttpStatus.BAD_REQUEST).json({ error: "Customer [" + req.params.id + "] does not exist" })
            return;
        }
    }
    catch (err) {
        next(err)
        return;
    }

    _customerRepository.CreateNewCustomerAction(customer, req)
        .then(result => {
            res.status(HttpStatus.CREATED).json({
                message: 'customer actions created'
            });
        })
        .catch(err => next(err));
});

router.patch('/:id/customeractions/:customeractionId', async (req, res, next) => {
    var customer;
    try {
        var customer = await _customerRepository.FindCustomer(req.headers.partnerid, req.params.id);
        if (!customer) {
            res.status(HttpStatus.BAD_REQUEST).json({ error: "Customer [" + req.params.id + "] does not exist" })
            return;
        }
    }
    catch (err) {
        next(err)
        return;
    }

    _customerRepository.UpdateCustomerAction(customer, req).then(result => {
        res.status(HttpStatus.OK).json({
            message: 'customer actions updated'
        });
    })
        .catch(err => next(err));
});

module.exports = router;