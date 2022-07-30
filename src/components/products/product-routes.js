const productsRouter = require('express').Router();
const container = require('./service-provider');
const productController = container.resolve('productController');


productsRouter.get('/products',        (req, res, next) => productController.getAllProducts(req, res, next));
productsRouter.post('/products',       (req, res, next) => productController.createProduct(req, res, next));
productsRouter.get('/products/:id',    (req, res, next) => productController.getProductById(req, res, next));
productsRouter.get('/categories/:categoryId/products', (req, res, next) => productController.getCategoryProducts(req, res, next));
productsRouter.patch('/products/:id',  (req, res, next) => productController.updateProduct(req, res, next));
productsRouter.delete('/products/:id', (req, res, next) => productController.deleteProduct(req, res, next));


module.exports = productsRouter;