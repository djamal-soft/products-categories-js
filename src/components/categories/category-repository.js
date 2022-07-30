const { Op } = require('sequelize');
const ResourceNotFoundError = require('../../common/exceptions/business/resource-not-found-error');
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
     * @throws ResourceNotFoundError
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

        if (!category) {
            throw new ResourceNotFoundError(`category with id: '${id}' doesn't exists`)
        }
        
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
        const createdCategory = await this.categorySchema.create(category.serialize());

        return createdCategory.id;
    }

    /**
     * Update category data identified by category.id in database.
     * 
     * @param {Category} category 
     * 
     * @throws ResourceNotFoundError
     */
    async update(category) {
        const result = await this.categorySchema.update(category.serialize(), {
            where: {
              id: category.id
            }
        });

        if(result?.pop() === 0) {
            throw new ResourceNotFoundError(`category with id: '${category.id}' doesn't exists`)
        }
    }

    /**
     * Delete category identified by id from database.
     * 
     * @param {int} id 
     */
    async delete(id) {
        await this.categorySchema.destroy({
            where: { id }
          });
    }

    /**
     * Return categories that its id in array of ids sent in params. 
     * 
     * @param {Array<number>} ids 
     * 
     * @returns {Array<Category>}
     */
    async findCategories(ids) {
        const options = { 
            where: { 
                id: {[Op.in]: ids}
            }, 
            raw: true, 
        };
        
        const categories = await this.categorySchema.findAll(options);

        return categories.map(c => Category.fromObject(c));
    }
}

module.exports = CategoryRepository;