const {CategorySchema, categoryancestor} = require('../../../components/categories/database/category-sequelize-schema');
const ProductSchema = require('../../../components/products/database/product-sequelize-schema');

const schemas = [
    CategorySchema,
    categoryancestor,
    ProductSchema,
];

function syncDatabase() {
    schemas.forEach(async (schema) => {
        await schema.sync();
    });
}

module.exports = syncDatabase;