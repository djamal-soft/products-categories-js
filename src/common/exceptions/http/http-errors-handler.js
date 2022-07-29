const BadRequestError = require("./bad-request-error")

function httpErrorsHandler (err, req, res, next) {
    res.status(err.statusCode ?? 500)
        .json(getErrorResponse(err));
}

function getErrorResponse(error) {
    const response = {
        message: error.message,
    }

    if(error instanceof BadRequestError) {
        response.errors = error.errors
    }

    return response;
}

module.exports = httpErrorsHandler;