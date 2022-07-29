// const { DataTypes } = require('sequelize');
// const sequelize = require('../../../common/database/sequelize/sequelize-db');
// const ProductSchema = require('../../products/database/product-sequelize-schema');

// const CategorySchema = sequelize.define('category', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     name: DataTypes.STRING,
//   });

//   const ProductsCategories = sequelize.define("productsCategories",
//     {},
//     { timestamps: false }
//   );

//   CategorySchema.isHierarchy();
//   categoryancestor = sequelize.models.categoryancestor;

//   CategorySchema.belongsToMany(ProductSchema, { through: ProductsCategories });

//   module.exports = {
//     CategorySchema,
//     categoryancestor,
//     ProductsCategories
//   };