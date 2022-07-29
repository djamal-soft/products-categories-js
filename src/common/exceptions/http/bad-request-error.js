const HttpBaseException = require("./http-base-exception");

class BadRequestError extends HttpBaseException {

    constructor(message, errors) {
        super(message, 400);
        this._errors = errors;
    }

    get errors() {
        return this._errors;
    }
}

module.exports = BadRequestError;