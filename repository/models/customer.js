const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    customerId: { type: String, require: true},
    partnerId: { type: Number, require: true},
    customerDetails: {
        country: { type: String, require: true }
    },
    customerActions: {
        type: [{
            customerActionId: {type: String, require: true},
            customerActionType: {type: String, require: true},
            createdAt: {type: Date, default: Date.now}
        }]
    },
    results: mongoose.Schema.Types.Mixed,
    lastResultsUpdatedAt: Date
},
{
    timestamps: true, strict: false
});

module.exports = mongoose.model('Customer', customerSchema);