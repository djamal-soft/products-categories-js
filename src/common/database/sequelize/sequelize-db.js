const Sequelize = require('sequelize-hierarchy')();

const database = process.env.MYSQL_DATABASE;
const host     = process.env.MYSQL_HOST;
const port     = process.env.MYSQL_PORT;
const user     = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;

const sequelize = new Sequelize(`mysql://${user}:${password}@${host}:${port}/${database}`);

module.exports = sequelize