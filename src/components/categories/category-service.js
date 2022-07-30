const ResourceNotFoundError = require("../../common/exceptions/business/resource-not-found-error");
const ActionsEnum = require("./actions-enum");

class CategoryService {
    
    constructor(categoryRepository, categoryValidator) {
        this.repository = categoryRepository;
        this.validator  = categoryValidator;
    }

    /**
     * Returns array of categories retrieved from storage.
     * if hierarchy is true then return data as a hierarchy 
     * otherwise return flat list of categories.
     * 
     * @param {boolean} hierarchy 
     * 
     * @returns {Array<Category>}
     */
    async findAll(hierarchy = false) {
        return this.repository.findAll(hierarchy);
    }

    /**
     * Retriev category that identified by id from storage.
     * if hierarchy is true then return data as a hierarchy 
     * otherwise return category without children.
     * 
     * @param {number} id 
     * @param {boolean} hierarchy 
     * 
     * @returns {Array<Category>}
     */
    findById(id, hierarchy = false) {
        return this.repository.findById(id, hierarchy);
    }

    /**
     * Persist category using supported storage.
     * 
     * @param {Category} category 
     * 
     * @throws ValidationError
     * 
     * @returns {number} created category id
     */
    async create(category) {
        this.validator.validate(
            category.serialize(), 
            ActionsEnum.CREATE_CATEGORY
        );

        return this.repository.create(category);
    }

    /**
     * Update category identified by category.id.
     * 
     * @param {Category} category 
     * 
     * @throws ValidationError
     */
    async update(category) {
        this.validator.validate(
            category.serialize(), 
            ActionsEnum.UPDATE_CATEGORY
        );

        await this.repository.update(category);
    }

    /**
     * delete category identified by category.id.
     * 
     * @param {number} id 
     */
     delete(id) {
        this.repository.delete(id);
    }

    /**
     * Returns category and sub category ids.
     * 
     * @param {number} id
     * 
     * @throws ResourceNotFoundError
     * 
     * @return {Array<number>} 
     */
     async getSubCategoriesIds(id) {
        const category = await this.findById(id, true);

        return category.ids;
    }

    /**
     * Check if all categories is exists in our storage.
     * 
     * @param {Array<number>} ids 
     * 
     * @throws ResourceNotFoundError
     */
    async isAllCategoriesExists(ids) {
        let categories = await this.repository.findCategories(ids, ['id']);
        categories = categories.map(c => c.id);

        if(categories.length !== ids.length) {
            const notFoundCategories = ids.filter(id => !categories.includes(id));
            throw new ResourceNotFoundError(`categories with ids [${notFoundCategories}] doesn't exists`)
        }

    }
}

module.exports = CategoryService;