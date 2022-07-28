class CategoryService {
    
    constructor(categoryRepository) {
        this.repository = categoryRepository;
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
     * @param {int} id 
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
     * @returns {int} created category id
     */
    async create(category) {
        
        return this.repository.create(category);
    }

    update(category) {
        this.repository.update(category);
    }

    delete(id) {
        this.repository.delete(id);
    }
}

module.exports = CategoryService;