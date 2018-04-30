const mongoose = require('mongoose');
const Customer = require('../../repository/models/customer');

class CustomerRepositry{
    async FindCustomer(c, u) {
        return await Customer.findOne({ partnerId: c, customerId: u }).exec();
    }

    async FindCustomers(c, u) {
        return await Customer.find({ partnerId: c}).exec();
    }

    async CreateNewCustomer (req){
        var customer = new Customer({
            _id: mongoose.Types.ObjectId(),
            customerId: req.params.id,
            partnerId: req.headers.partnerid
        });
    
        const objAdditional = req.body;
        const setOps = {};
        for (var o in objAdditional) {
            if (objAdditional.hasOwnProperty(o)) {
                setOps[o] = objAdditional[o];
            }
        }
        const customerDetails = { customerDetails: setOps }
        customer.$set(customerDetails);
        return await customer.save();
    }

    async UpdateCustomer (customer, req){
        const objAdditional = req.body;
        const setOps = {};
        for (var o in objAdditional) {
            if (objAdditional.hasOwnProperty(o)) {
                setOps[o] = objAdditional[o];
            }
        }
        const customerDetails = { customerDetails: setOps }
        customer.$set(customerDetails);
        return await customer.save();
    }

    async CreateNewCustomerAction (customer, req){
        var customerAction = {"customerActionId": req.params.customeractionId};
        const objAdditional = req.body;
            for (var o in objAdditional) {
                if (objAdditional.hasOwnProperty(o)) {
                    customerAction[o] = objAdditional[o];
                }
            }
    
        customer.customerActions.push(customerAction);
        return await customer.save();
    }

    async UpdateCustomerAction (customer, req){
        var customerAction = {"customerActionId": req.params.customeractionId};
    const objAdditional = req.body;
        for (var o in objAdditional) {
            if (objAdditional.hasOwnProperty(o)) {
                customerAction[o] = objAdditional[o];
            }
        }

    var index = customer.customerActions.findIndex(c => c.customerActionId == req.params.customeractionId);
    customer.customerActions[index] = customerAction;
        return await customer.save();
    }
}

module.exports = CustomerRepositry;