const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize-db');


const CategorySchema = sequelize.define('category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
  });

  const ProductSchema = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
  });

  const ProductsCategories = sequelize.define("productsCategories",
    {},
    { timestamps: false }
  );

  CategorySchema.belongsToMany(ProductSchema, { through: ProductsCategories });
  ProductSchema.belongsToMany(CategorySchema, { through: ProductsCategories });

  CategorySchema.isHierarchy();
  categoryancestor = sequelize.models.categoryancestor;


const schemas = [
    CategorySchema,
    categoryancestor,
    ProductSchema,
    ProductsCategories
];

function syncDatabase() {
    schemas.forEach(async (schema) => {
        await schema.sync();
    });
}

module.exports = {
    CategorySchema,
    ProductsCategories,
    ProductSchema,
    syncDatabase,
  };