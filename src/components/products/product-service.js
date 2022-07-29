const ActionsEnum = require("./actions-enum");

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
     * @returns {Array<Product>}
     */
    findById(id) {
        return this.repository.findById(id);
    }

    /**
     * Persist product using supported storage.
     * 
     * @param {Product} product 
     * @returns {int} created product id
     */
    async create(product) {
        this.validator.validate(
            product.serialize(), 
            ActionsEnum.CREATE_PRODUCT
        );

        return this.repository.create(product);
    }

    async update(product) {
        this.validator.validate(
            product.serialize(), 
            ActionsEnum.UPDATE_CATEGORY
        );

        await this.repository.update(product);
    }

    delete(id) {
        this.repository.delete(id);
    }

    /**
     * Returns products belongs to array of categories.
     * 
     * @param {Array<number>} categories 
     */
     async getProductsBelongsTo(categoryId) {
         const categories = await this.categoryService.getSubCategoriesIds(categoryId);
         console.log(categories);
        return this.repository.getProductsBelongsTo(categories);
    }
}

module.exports = ProductService;