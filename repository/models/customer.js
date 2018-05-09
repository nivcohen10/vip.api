const mongoose = require('mongoose');


const customerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    customerId: { type: String, required: true},
    partnerId: { type: Number, required: true},
    a: { type: Number, required: true},
    customerDetails: {
        country: { type: String, require: true }
    },
    customerActions: {
        type: [{
            customerActionId: {type: String, required: true},
            customerActionType: {type: String, required: true},
            createdAt: {type: Date, default: Date.now}
        }]
    },
    results: mongoose.Schema.Types.Mixed,
    lastResultsUpdatedAt: Date
},
{
    timestamps: true
});

module.exports = mongoose.model('Customer', customerSchema);