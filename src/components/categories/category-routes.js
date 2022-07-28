const categoriesRouter = require('express').Router();
const container = require('./service-provider');
const categoryController = container.resolve('categoryController');


categoriesRouter.get('/categories',        (req, res) => categoryController.getAllCategories(req, res));
categoriesRouter.post('/categories',       (req, res) => categoryController.createCategory(req, res));
categoriesRouter.get('/categories/:id',    (req, res) => categoryController.getCategoryById(req, res));
categoriesRouter.patch('/categories/:id',  (req, res) => categoryController.updateCategory(req, res));
categoriesRouter.delete('/categories/:id', (req, res) => categoryController.deleteCategory(req, res));


module.exports = categoriesRouter;