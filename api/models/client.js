const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    clientId: {type: Number, require: true}, 
    users: [
        {
            name: String, 
            password: String, 
            createDate: { type: Date, default: Date.now }
        }
    ],
    apiKey: {type: String , require: true},
},
{
    timestamps: true
});

module.exports = mongoose.model('client', clientSchema);