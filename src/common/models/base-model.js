class BaseModel {


    /**
     * Create new model instance from object data.
     * 
     * @param {object} object
     * 
     * @return {BaseModel}
     */
    static fromObject(object) {
        const model = new this();

        for (const [property, val] of Object.entries(object)) {
            if (model._hasSetter(property)) {
                model[property] = val;
            }
        }

        return model;
    }

    /**
     * Check if model has a setter method for a property.
     */
    _hasSetter(property) {
        const protoType = Object.getPrototypeOf(this);
        return Object.getOwnPropertyDescriptor(protoType, property) !== undefined;
    }


    /**
     * Serialize model data and remove underscore in property name.
     * 
     * @return {object}
     */
    serialize() {
        const data = {};
        for (const [key, val] of Object.entries(this)) {
            const propertyName = this._removeUnderscore(key);
            data[propertyName] = this._isArrayOfModels(val) ? val.map(v => v.serialize()) : val;
        }

        return data;
    }

    _isArrayOfModels(val) {
        return Array.isArray(val) && val.every(v => v instanceof BaseModel);
    }

    /**
 * Remove underscore from property name.
 */
    _removeUnderscore(property) {
        return property.startsWith('_') ? property.substring(1) : property
    }
}

module.exports = BaseModel;