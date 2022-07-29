const BaseModel = require("../../common/models/base-model");

class Product extends BaseModel {

    /**
     * @param {int} value 
     */
    set id(value) {
        this._id = value;
    }

    /**
     * @return {int}
     */
    get id() {
        return this._id;
    }

    /**
     * @param {string} value 
     */
    set name(value) {
        this._name = value;
    }

    /**
     * @return {string}
     */
    get name() {
        return this._name;
    }
}

module.exports = Product;