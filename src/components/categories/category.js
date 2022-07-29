const BaseModel = require("../../common/models/base-model");

class Category extends BaseModel {

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
     * @param {int} parentId 
     */
    set parentId(value) {
        this._parentId = value;
    }

    /**
     * @return {int}
     */
    get parentId() {
        return this._parentId;
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
     * @param {Array<Category>} value 
     */
    set children(value) {
        this._children = value.map(c => Category.fromObject(c));
    }

    /**
     * @return {Array<Category>}
     */
    get children() {
        return this._children;
    }

    get ids() {
        return this.children?.length > 0 
            ? [this.id, ...this.children.flatMap(c => c.ids)] 
            : this.id;
    }
}

module.exports = Category;