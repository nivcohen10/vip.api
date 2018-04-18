const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {type: String, require: true}, 
    data: mongoose.Schema.Types.Mixed,
    createDate: Date,
    updateDate: Date
});

module.exports = mongoose.model('transaction', transactionSchema);