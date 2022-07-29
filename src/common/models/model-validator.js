const Validator = require('validatorjs');
const ValidationError = require('../exceptions/business/validation-error');

class ModelValidator {

    validate(data, action) {
        const validation = new Validator(
            data, 
            this._getRules(action)
        );

        if (validation.fails()) {
            throw new ValidationError(validation.errors.all())
        }
    }


    _getRules(action) {
        return {}
    }
}

module.exports = ModelValidator;