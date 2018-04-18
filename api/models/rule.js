const mongoose = require('mongoose');

const ruleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    clientId: {type: Number, require: true}, 
    priority: Number,
    type: String
},
{
    timestamps: true
});

module.exports = mongoose.model('rule', ruleSchema);