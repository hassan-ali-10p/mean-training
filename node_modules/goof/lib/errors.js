// all the custom exceptions which are inherited by Error 

var Msg = require("./messages");
var Util = require("util");

// add toJSON method on error object so on stringify it will be able to generate JSON

var Messages = new Msg();
Object.defineProperty(Error.prototype, "toJSON", {
    value: function () {
        var alt = {};

        Object.getOwnPropertyNames(this).forEach(function (key) {
            alt[key] = this[key];
        }, this);

        return alt;
    },
    configurable: true
});

var applicationError = function (errorMessage, constructor) {

    Error.captureStackTrace(this, constructor || this);

    if (errorMessage) {
        this.error_message = errorMessage;
    }
    else {
        this.error_message = Util.format("%s: Error message was not specified.", this.name);
    }

    this.httpCode = "500";
};

Util.inherits(applicationError, Error);
applicationError.prototype.name = "applicationError";

var unAuthenticatedError = function (err) {
    this.httpCode = "401";
    this.error_message = err ? err : Messages.getMessage("AUTH_FAILED");
};
Util.inherits(unAuthenticatedError, applicationError);
unAuthenticatedError.prototype.name = "unAuthenticatedError";



var unAuthorizedError = function (err) {
    this.httpCode = "403";
    this.error_message = err ? err : Messages.getMessage("AUTHORIZATION_FAILED");
};
Util.inherits(unAuthorizedError, applicationError);
unAuthorizedError.prototype.name = "unAuthorizedError";


var notFoundError = function (err_arg) {
    this.httpCode = "404";
    this.error_message = Messages.getMessage("NOT_FOUND");
    if(err_arg){
        this.error_message = Util.format(this.error_message, err_arg);
    }

};

Util.inherits(notFoundError, applicationError);
notFoundError.prototype.name = "notFoundError";


var invalidArgumentsError = function (err) {
    this.httpCode = "400";
    this.error_message = err ? err : Messages.getMessage("INVALID_ARGS");
};
Util.inherits(invalidArgumentsError, applicationError);
invalidArgumentsError.prototype.name = "invalidArgumentsError";

module.exports = {
    applicationError : applicationError,
    unAuthenticatedError : unAuthenticatedError,
    unAuthorizedError: unAuthorizedError,
    invalidArgumentsError: invalidArgumentsError,
    notFoundError : notFoundError
};
