const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize-db');

// categories table schema
const CategorySchema = sequelize.define('category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
  });


  // products table schema
  const ProductSchema = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
  });

  // productsCategories table schema
  const ProductsCategories = sequelize.define("productsCategories",
    {},
    { timestamps: false }
  );

  // products Categories belongs to many relationship
  CategorySchema.belongsToMany(ProductSchema, { through: ProductsCategories });
  ProductSchema.belongsToMany(CategorySchema, { through: ProductsCategories });

  // defin Categories is an Hierarchy
  CategorySchema.isHierarchy();
  categoryancestor = sequelize.models.categoryancestor;


const tables = [
    CategorySchema,
    categoryancestor,
    ProductSchema,
    ProductsCategories
];

// create database tables
function syncDatabase() {
    tables.forEach(async (schema) => {
        await schema.sync();
    });
}

module.exports = {
    CategorySchema,
    ProductsCategories,
    ProductSchema,
    syncDatabase,
  };