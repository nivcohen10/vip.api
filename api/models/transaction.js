const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    data: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model('transaction', transactionSchema);