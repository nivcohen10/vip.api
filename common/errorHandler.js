const ErrorObj = require('./../repository/models/error');
const mongoose = require('mongoose');

class ErrorHandler {
    constructor(req, err) {
      this.req = req;
      this.err = err;
      //console.log(this.err.stack)
    }
    
    LogError() {
      const error = new ErrorObj ({
        _id: mongoose.Types.ObjectId(),
        partnerId: this.req.headers.partnerid,
        req: {
            headers: this.req.headers,
            params: this.req.params,
            body: this.req.body,
            url: this.req.url,
            method: this.req.method,
            ip : this.req.ip
        },
        error: {
          name: this.err.name,
          message: this.err.message,
          stack: this.err.stack,
          status: this.err.status
        },
        createDate: Date.now()
      })

      .save()
      .then()
      .catch(err =>{
         console.log("ErrorHandler failed to save to db")});
    }
  }

  module.exports = ErrorHandler;