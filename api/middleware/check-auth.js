const HttpStatus = require('http-status-codes');
const Client = require('../models/client');

module.exports = (req,res, next) => {
    // todo: cache
    Client.findOne({clientId: req.headers.clientid})
        .exec()
        .then(doc => {
            if (doc && doc.apiKey == req.headers.apikey){
                next();
            }
            else{
                const err = new Error ("invalid clientid or apiKey");
                err.status = HttpStatus.BAD_REQUEST;
                next(err);
            }
        })
        .catch(err => {
             next(err);
        })
}