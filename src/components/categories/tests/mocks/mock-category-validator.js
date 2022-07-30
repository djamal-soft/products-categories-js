const ValidationError = require("../../../../common/exceptions/business/validation-error");

class MockCategoryValidator {

    validate(data, action) {
        if(data == null) {
            throw new ValidationError([]);
        }
    }
}

module.exports = MockCategoryValidator;