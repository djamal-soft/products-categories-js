const httpErrorsFactory = require("../../common/exceptions/http/http-errors-factory");
const Category = require("./category");

class CategoryController {

    constructor(categoryService) {
        this.categoryService = categoryService;
    }

    /**
     * Handle get all gategories route.
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    async getAllCategories(req, res, next) {
        try {
            const hierarchy = req.query.hierarchy === 'true';
            const categories = await this.categoryService.findAll(hierarchy);

            res.json(categories.map(c => c.serialize()));
        } catch (error) {
            const httpError = httpErrorsFactory.fromBusinessError(error);
            next(httpError);
        }
    }

    /**
     * Handle get one category identified by id route.
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    async getCategoryById(req, res, next) {
        try {
            const id        = req.params.id;
            const hierarchy = req.query.hierarchy === 'true';

            const category  = await this.categoryService.findById(id, hierarchy);

            res.json(category.serialize());
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
    async createCategory(req, res, next) {
        try {
            const category = Category.fromObject(req.body);
            const id = await this.categoryService.create(category);

            res.json({id});
        } catch (error) {
            const httpError = httpErrorsFactory.fromBusinessError(error);
            next(httpError);
        }
    }

    /**
     * Handle update category identified by id route.
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
     async updateCategory(req, res, next) {
        try {
            const id        = req.params.id;
            const category  = Category.fromObject({...req.body, id});
            await this.categoryService.update(category);

            res.status(201).json({});
        } catch (error) {
            const httpError = httpErrorsFactory.fromBusinessError(error);
            next(httpError);
        }
    }

    /**
     * Handle delete category identified by id route.
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
     async deleteCategory(req, res, next) {
        try {
            const id = req.params.id;
            await this.categoryService.delete(id);

            res.status(204).json({});
        } catch (error) {
            const httpError = httpErrorsFactory.fromBusinessError(error);
            next(httpError);
        }
    }

}

module.exports = CategoryController;