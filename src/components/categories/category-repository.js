const Category = require('./category');

class CategoryRepository {

    constructor(categorySchema) {
        this.categorySchema = categorySchema;
    }

    /**
     * Returns array of categories retrieved from database.
     * if hierarchy is true then return data as a hierarchy 
     * otherwise return flat list of categories.
     * 
     * @param {boolean} hierarchy 
     * 
     * @returns {Array<Category>}
     */
    async findAll(hierarchy = false) {
        const categories = await this.categorySchema.findAll({ hierarchy: hierarchy, raw: true, });

        return categories.map(c => Category.fromObject(c));
    }

    /**
     * Retriev category that identified by id from database.
     * if hierarchy is true then return data as a hierarchy 
     * otherwise return category without children.
     * 
     * @param {int} id 
     * @param {boolean} hierarchy 
     * 
     * @returns {Array<Category>}
     */
    async findById(id, hierarchy = false) {
        const category = await this.categorySchema.findOne({
            where: { id },
            include: {
              model: this.categorySchema,
              as: 'descendents',
              hierarchy: hierarchy
            }
          });
        
        return Category.fromObject(
            JSON.parse(JSON.stringify(category))
        );  
    }

    /**
     * Persist category in database and return category identifier.
     * 
     * @param {Category} category 
     * 
     * @returns {int}
     */
    async create(category) {
        const createdCategory = await this.categorySchema.create(category);
        return createdCategory.id;
    }

    async update(category) {
        await this.categorySchema.update(category.serialize(), {
            where: {
              id: category.id
            }
        });
    }

    async delete(id) {
        await this.categorySchema.destroy({
            where: { id }
          });
    }
}

module.exports = CategoryRepository;