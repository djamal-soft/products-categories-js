const {CategorySchema, categoryancestor} = require('../../../components/categories/database/category-sequelize-schema');

const schemas = [
    CategorySchema,
    categoryancestor
];

function syncDatabase() {
    schemas.forEach(async (schema) => {
        await schema.sync();
    });
}

module.exports = syncDatabase;