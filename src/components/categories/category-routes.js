const categoriesRouter = require('express').Router();
const container = require('./service-provider');
const categoryController = container.resolve('categoryController');


categoriesRouter.get('/categories',        (req, res, next) => categoryController.getAllCategories(req, res, next));
categoriesRouter.post('/categories',       (req, res, next) => categoryController.createCategory(req, res, next));
categoriesRouter.get('/categories/:id',    (req, res, next) => categoryController.getCategoryById(req, res, next));
categoriesRouter.patch('/categories/:id',  (req, res, next) => categoryController.updateCategory(req, res, next));
categoriesRouter.delete('/categories/:id', (req, res, next) => categoryController.deleteCategory(req, res, next));


module.exports = categoriesRouter;