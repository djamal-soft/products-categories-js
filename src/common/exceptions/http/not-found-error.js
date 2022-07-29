const HttpBaseException = require("./http-base-exception");

class NotFoundError extends HttpBaseException {

    constructor(message) {
        super(message, 404);
    }
}

module.exports = NotFoundError;