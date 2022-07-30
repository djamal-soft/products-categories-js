const { Op } = require('sequelize');
const { CategorySchema } = require('../../common/database/sequelize/schemas');
const ResourceNotFoundError = require('../../common/exceptions/business/resource-not-found-error');
const Product = require('./product');

class ProductRepository {

    constructor(productSchema) {
        this.productSchema = productSchema;
    }

    /**
     * Returns array of products retrieved from database.
     * if hierarchy is true then return data as a hierarchy 
     * otherwise return flat list of products.
     * 
     * @param {boolean} hierarchy 
     * 
     * @returns {Array<Product>}
     */
    async findAll() {
        const products = await this.productSchema.findAll({ 
            include: CategorySchema,
        });

        return products.map(p => Product.fromObject(
                JSON.parse(JSON.stringify(p))
            )
        );
    }

    /**
     * Retriev product that identified by id from database.
     * 
     * @param {int} id 
     * @param {boolean} hierarchy 
     * 
     * @throws ResourceNotFoundError
     * 
     * @returns {Array<Product>}
     */
    async findById(id) {
        const product = await this.productSchema.findOne({
            where: { id },
            include: CategorySchema,
          });

        if (!product) {
            throw new ResourceNotFoundError(`product with id: '${id}' doesn't exists`)
        }
        
        return Product.fromObject(
            JSON.parse(JSON.stringify(product))
        );  
    }

    /**
     * Persist product in database and return product identifier.
     * 
     * @param {Product} product 
     * 
     * @returns {int}
     */
    async create(product) {
        const {categories, ...rest} = product.serialize()
        const createdProduct = await this.productSchema.create(rest);
        await createdProduct.addCategory(categories);

        return createdProduct.id;
    }

    /**
     * Update product data identified by product.id in database.
     * 
     * @param {Product} product 
     * 
     * @throws ResourceNotFoundError
     */
    async update(product) {

        const fetchedProduct = await this.productSchema.findOne({
            where: { id: product.id },
        });

        if(!fetchedProduct) {
            throw new ResourceNotFoundError(`product with id: '${product.id}' doesn't exists`)
        }

        fetchedProduct.update(product.serialize());

        if(product.categories) {
            const fetchedProduct = await this.productSchema.findOne({
                where: { id: product.id },
            });
    
            fetchedProduct.setCategories(product.categories);
        }
    }

    /**
     * Delete product identified by id from database.
     * 
     * @param {int} id 
     */
     async delete(id) {
        await this.productSchema.destroy({
            where: { id }
          });
    }

    /**
     * Returns products belongs to array of categories.
     * 
     * @param {Array<number>} categories 
     * 
     * @return {Array<Product>} 
     */
     async getProductsBelongsTo(categories) {
        const result = this.productSchema.findAll({
            group: ['id'],
            include: [{
                model: CategorySchema,
                attributes: [],
                required: true,
                through: {
                   attributes: [],
                    where: {
                        categoryId: {[Op.in]: categories}
                    }
                }
            }],
            raw: true,
        });

        return result.map(p => Product.fromObject(p));
    }
}

module.exports = ProductRepository;