const ModelValidator = require("../../common/models/model-validator");
const ActionsEnum = require("./actions-enum");

const rules = {
    [ActionsEnum.CREATE_CATEGORY]: {
        'name': 'required|string|min:3|max:255',
        'parentId': 'integer|min:1',
    },
    [ActionsEnum.UPDATE_CATEGORY]: {
        'name': 'string|min:3|max:255',
        'parentId': 'integer|min:1',
    }
};

class CategoryValidator extends ModelValidator {


    _getRules(action) {
        return rules[action];
    }
}

module.exports = CategoryValidator;