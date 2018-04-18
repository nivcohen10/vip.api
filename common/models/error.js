const mongoose = require('mongoose');

const errorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    clientId: Number,
    req: mongoose.Schema.Types.Mixed,
    error: mongoose.Schema.Types.Mixed,
    createDate: Date
});

module.exports = mongoose.model('error', errorSchema);