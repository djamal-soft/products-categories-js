const BusinessBaseError = require("../business/business-base-error");
const ResourceNotFoundError = require("../business/resource-not-found-error");
const ValidationError = require("../business/validation-error");
const BadRequestError = require("./bad-request-error");
const InternalServerError = require("./internal-server-error");
const NotFoundError = require("./not-found-error");

class httpErrorsFactory {

    static fromBusinessError(error) {
        console.log(error);
        if (!(error instanceof BusinessBaseError)) {
            return new InternalServerError('internal server error');
        }

        if (error instanceof ValidationError) {
            return new BadRequestError(error.message, error.errors);
        }

        if (error instanceof ResourceNotFoundError) {
            return new NotFoundError(error.message);
        }
    }
}

module.exports = httpErrorsFactory;