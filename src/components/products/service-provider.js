const awilix = require('awilix')
const ProductController = require('./product-controller');
const ProductRepository = require('./product-repository');
const ProductService = require('./product-service');
const ProductValidator = require('./product-validator');
// const ProductSchema = require('./database/product-sequelize-schema');
const container = require('../categories/service-provider');
const { ProductSchema } = require('../../common/database/sequelize/schemas');

container.register({
    productSchema: awilix.asValue(ProductSchema),
    productRepository: awilix.asClass(ProductRepository),
    productService: awilix.asClass(ProductService),
    productController: awilix.asClass(ProductController),
    productValidator: awilix.asClass(ProductValidator),
})

module.exports = container;