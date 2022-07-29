const awilix = require('awilix');
const { CategorySchema } = require('../../common/database/sequelize/schemas');
const container = require('../../common/di/di');
const CategoryController = require('./category-controller');
const CategoryRepository = require('./category-repository');
const CategoryService = require('./category-service');
const CategoryValidator = require('./category-validator');
// const {CategorySchema} = require('./database/category-sequelize-schema');

container.register({
    categorySchema: awilix.asValue(CategorySchema),
    categoryRepository: awilix.asClass(CategoryRepository),
    categoryService: awilix.asClass(CategoryService),
    categoryController: awilix.asClass(CategoryController),
    categoryValidator: awilix.asClass(CategoryValidator),
})

module.exports = container;