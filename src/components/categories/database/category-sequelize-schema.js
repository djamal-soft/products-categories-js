const { DataTypes } = require('sequelize');
const sequelize = require('../../../common/database/sequelize/sequelize-db');

const CategorySchema = sequelize.define('category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
  });

  CategorySchema.isHierarchy();
  categoryancestor = sequelize.models.categoryancestor;
console.log(categoryancestor);
  module.exports = {
    CategorySchema,
    categoryancestor
  };