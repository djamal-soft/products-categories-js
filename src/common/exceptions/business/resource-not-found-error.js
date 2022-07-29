const BusinessBaseError = require("./business-base-error");

class ResourceNotFoundError extends BusinessBaseError {

    constructor(message = 'resource not found error') {
        super(`not found`, message);
    }
}

module.exports = ResourceNotFoundError;