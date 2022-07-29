const httpErrorsFactory = require("../../common/exceptions/http/http-errors-factory");
const Product = require("./product");

class ProductController {

    constructor(productService) {
        this.productService = productService;
    }

    /**
     * Handle get all gategories route.
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    async getAllProducts(req, res, next) {
        try {
            const products = await this.productService.findAll();

            res.json(products.map(c => c.serialize()));
        } catch (error) {
            const httpError = httpErrorsFactory.fromBusinessError(error);
            next(httpError);
        }
    }

    /**
     * Handle get one Product identified by id route.
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    async getProductById(req, res, next) {
        try {
            const id        = req.params.id;

            const product  = await this.productService.findById(id);

            res.json(product.serialize());
        } catch (error) {
            const httpError = httpErrorsFactory.fromBusinessError(error);
            next(httpError);
        }
    }

    /**
     * Handler for creation of gategories route.
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    async createProduct(req, res, next) {
        try {
            console.log(req.body);
            const product = Product.fromObject(req.body);
            console.log(product);
            const id = await this.productService.create(product);

            res.json({id});
        } catch (error) {
            const httpError = httpErrorsFactory.fromBusinessError(error);
            next(httpError);
        }
    }

    /**
     * Handle update product identified by id route.
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
     async updateProduct(req, res, next) {
        try {
            const id        = req.params.id;
            const product  = Product.fromObject({...req.body, id});
            await this.productService.update(product);

            res.status(201).json({});
        } catch (error) {
            const httpError = httpErrorsFactory.fromBusinessError(error);
            next(httpError);
        }
    }

    /**
     * Handle delete product identified by id route.
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
     async deleteProduct(req, res, next) {
        try {
            const id = req.params.id;
            await this.productService.delete(id);

            res.status(204).json({});
        } catch (error) {
            const httpError = httpErrorsFactory.fromBusinessError(error);
            next(httpError);
        }
    }

    /**
     * Handle delete product identified by id route.
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
     async getProductsBelongsTo(req, res, next) {
        try {
            const categoryId = req.params.categoryId;
            const products   = await this.productService.getProductsBelongsTo(categoryId);

            res.json(products.map(p => p.serialize()));
        } catch (error) {
            const httpError = httpErrorsFactory.fromBusinessError(error);
            next(httpError);
        }
    }

}

module.exports = ProductController;