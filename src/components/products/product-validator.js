const ModelValidator = require("../../common/models/model-validator");
const ActionsEnum = require("./actions-enum");
const rules = {};

rules[ActionsEnum.CREATE_PRODUCT] = {
    'name': 'required|string|min:3|max:255',
}

rules[ActionsEnum.UPDATE_PRODUCT] = {
    'name': 'string|min:3|max:255',
}

class ProductValidator extends ModelValidator {


    _getRules(action) {
        return rules[action];
    }
}

module.exports = ProductValidator;