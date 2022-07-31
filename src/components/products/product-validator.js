const ModelValidator = require("../../common/models/model-validator");
const ActionsEnum = require("./actions-enum");
const rules = {
    [ActionsEnum.CREATE_PRODUCT]: {
        'name': 'required|string|min:3|max:255',
        'categories': 'array',
        'categories.*': 'numeric|min:1',
    },
    [ActionsEnum.UPDATE_PRODUCT]: {
        'name': 'string|min:3|max:255',
        'categories': 'array',
        'categories.*': 'numeric|min:1',
    },
};

class ProductValidator extends ModelValidator {


    _getRules(action) {
        return rules[action];
    }
}

module.exports = ProductValidator;