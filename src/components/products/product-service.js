const ActionsEnum = require("./actions-enum");
const Product = require("./product");

class ProductService {
    
    constructor(productRepository, productValidator, categoryService) {
        this.repository = productRepository;
        this.validator  = productValidator;
        this.categoryService = categoryService;
    }

    /**
     * Returns array of products retrieved from storage.
     * if hierarchy is true then return data as a hierarchy 
     * otherwise return flat list of products.
     * 
     * @returns {Array<Product>}
     */
    async findAll() {
        return this.repository.findAll();
    }

    /**
     * Retriev product that identified by id from storage.
     * if hierarchy is true then return data as a hierarchy 
     * otherwise return product without children.
     * 
     * @param {int} id 
     * @param {boolean} hierarchy 
     * 
     * @throws ResourceNotFoundError
     * 
     * @returns {Array<Product>}
     */
    findById(id) {
        return this.repository.findById(id);
    }

    /**
     * Persist product using supported storage.
     * 
     * @param {Product} product 
     * 
     * @throws ValidationError
     * 
     * @returns {int} created product id
     */
    async create(product) {
        this.validator.validate(
            product.serialize(), 
            ActionsEnum.CREATE_PRODUCT
        );

        if(product.categories) {
            await this.categoryService.isAllCategoriesExists(product.categories);
        }

        return this.repository.create(product);
    }

    /**
     * Update product identified by product.id.
     * 
     * @param {Product} product 
     * 
     * @throws ValidationError
     */
    async update(product) {
        this.validator.validate(
            product.serialize(), 
            ActionsEnum.UPDATE_CATEGORY
        );

        if(product.categories) {
            await this.categoryService.isAllCategoriesExists(product.categories);
        }

        await this.repository.update(product);
    }

    /**
     * delete product identified by product.id.
     * 
     * @param {number} id 
     */
    delete(id) {
        this.repository.delete(id);
    }

    /**
     * Returns products belongs to a category and its sub categories.
     * 
     * @param {number} categoryId
     * 
     * @throws ResourceNotFoundError
     * 
     * @return {Array<Product>} 
     */
     async getCategoryProducts(categoryId) {
        const categories = await this.categoryService.getSubCategoriesIds(categoryId);

        return this.repository.getProductsBelongsTo(categories);
    }
}

module.exports = ProductService;