const HttpBaseException = require("./http-base-exception");

class InternalServerError extends HttpBaseException {

    constructor(message) {
        super(message, 500);
    }
}

module.exports = InternalServerError;