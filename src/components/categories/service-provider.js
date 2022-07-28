const awilix = require('awilix')
const CategoryController = require('./category-controller');
const CategoryRepository = require('./category-repository');
const CategoryService = require('./category-service');
const {CategorySchema} = require('./database/category-sequelize-schema');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.CLASSIC
});

container.register({
    categorySchema: awilix.asValue(CategorySchema),
    categoryRepository: awilix.asClass(CategoryRepository),
    categoryService: awilix.asClass(CategoryService),
    categoryController: awilix.asClass(CategoryController),
})

module.exports = container;