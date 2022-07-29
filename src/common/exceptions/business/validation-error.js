const BusinessBaseError = require("./business-base-error");

class ValidationError extends BusinessBaseError {

    constructor(errors, message = 'validation error') {
        super(`validation`, message);
        this._errors = errors;
    }

    get errors() {
        return this._errors;
    }
}

module.exports = ValidationError;