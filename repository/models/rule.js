const mongoose = require('mongoose');

const ruleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    //partnerId: {type: Number, require: true}, 
    priority: Number,
    type: String,
    rule: mongoose.Schema.Types.Mixed,
    result: mongoose.Schema.Types.Mixed
},
{
    timestamps: true
});

module.exports = mongoose.model('rule', ruleSchema);