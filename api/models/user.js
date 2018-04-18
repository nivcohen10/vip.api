const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: String, require: true},
    clientId: { type: Number, require: true},
    country: { type: String },
    tierId: Number,
    extraDetails : mongoose.Schema.Types.Mixed,
    createDate: Date,
    updateDate: Date
});

module.exports = mongoose.model('User', userSchema);