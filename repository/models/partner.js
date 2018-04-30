const mongoose = require('mongoose');
const ruleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    //partnerId: {type: Number, require: true}, 
    priority: Number,
    type: String,
    rule: mongoose.Schema.Types.Mixed,
    result: mongoose.Schema.Types.Mixed
});

const partnerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    partnerId: { type: Number, require: true },
    customers: [
        {
            name: String,
            password: String,
            createDate: { type: Date, default: Date.now }
        }
    ],
    apiKey: { type: String, require: true },
    whitelistedIPs: Array,
    active: Boolean,
    /* rules: [{
        _id: mongoose.Schema.Types.ObjectId,
        partnerId: { type: Number, require: true },
        priority: Number,
        type: String,
        rule: mongoose.Schema.Types.Mixed,
        results: mongoose.Schema.Types.Mixed,
        createdAt: { type: Date, default: Date.now }
    }], */
    rules: [ruleSchema],
    lasrRulesUpdatedAt: Date
},
    {
        timestamps: true
    });

module.exports = mongoose.model('partner', partnerSchema);