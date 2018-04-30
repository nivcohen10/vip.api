const HttpStatus = require('http-status-codes');
const Partner = require('../../repository/models/partner');

module.exports = (req, res, next) => {
    console.log(req.ip)
    //console.log(req.connection)

    // todo: cache
    Partner.findOne({ partnerId: req.headers.partnerid })
        .exec()
        .then(doc => {
            //console.log(doc)
            if (doc
                && doc.apiKey == req.headers.apikey
                && doc.whitelistedIPs.includes(req.ip)) {
                next();
            }
            else {
                const err = new Error("invalid partnerid or apiKey or ip " + doc);
                err.status = HttpStatus.BAD_REQUEST;
                next(err);
            }
        })
        .catch(err => {
            next(err);
        })
}