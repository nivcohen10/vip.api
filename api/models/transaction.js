const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {type: String, require: true}, 
    data: mongoose.Schema.Types.Mixed
},
{
    timestamps: true
});

module.exports = mongoose.model('transaction', transactionSchema);