const categorySchema = require('../../../components/categories/database/category-sequelize-schema');

const schemas = [
    categorySchema,
];

function syncDatabase() {
    schemas.forEach(async (schema) => {
        await schema.sync();
    });
}

module.exports = syncDatabase;