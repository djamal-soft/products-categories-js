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
    async getAllCategories(req, res) {
        try {
            const hierarchy = req.query.hierarchy === 'true';
            const categories = await this.categoryService.findAll(hierarchy);

            res.json(categories.map(c => c.serialize()));
        } catch (error) {
            console.log(error);
            res.status(500).send('error');
        }
    }

    /**
     * Handle get one category identified by id route.
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    async getCategoryById(req, res) {
        try {
            const id        = req.params.id;
            const hierarchy = req.query.hierarchy === 'true';

            const category  = await this.categoryService.findById(id, hierarchy);

            res.json(category.serialize());
        } catch (error) {
            console.log(error);
            res.status(500).send('error');
        }
    }

    /**
     * Handler for creation of gategories route.
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    async createCategory(req, res) {
        try {
            const id = await this.categoryService.create(req.body);

            res.json({id});
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    /**
     * Handle update category identified by id route.
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
     async updateCategory(req, res) {
        try {
            const id        = req.params.id;
            const category  = Category.fromObject({...req.body, id});
            await this.categoryService.update(category);

            res.status(201).json({});
        } catch (error) {
            console.log(error);
            res.status(500).send('error');
        }
    }

    /**
     * Handle delete category identified by id route.
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
     async deleteCategory(req, res) {
        try {
            const id = req.params.id;
            await this.categoryService.delete(id);

            res.status(204).json({});
        } catch (error) {
            console.log(error);
            res.status(500).send('error');
        }
    }

}

module.exports = CategoryController;