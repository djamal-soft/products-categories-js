const ValidationError = require("../../common/exceptions/business/validation-error");
const BaseModel = require("../../common/models/base-model");
const Category = require("../categories/category");

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

    /**
     * @param {int} value 
     */
     set categories(value) {
        if(!Array.isArray(value)) {
            throw new ValidationError({categories: ['categories must be an array']});
        }

        if(value.every(v => typeof v === 'number')) {
            this._categories = [...new Set(value)];
        } else {
            this._categories = value.map(v => Category.fromObject(v));
        }
        
    }

    /**
     * @return {int}
     */
    get categories() {
        return this._categories;
    }
}

module.exports = Product;