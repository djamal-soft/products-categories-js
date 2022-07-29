const express = require('express');
const bodyParser = require("body-parser");
const app = express();
require('dotenv').config()
const syncDatabase = require('./common/database/sequelize/schemas');
const port = 5000;
const categoriesRouter = require('./components/categories/category-routes');
const httpErrorsHandler = require('./common/exceptions/http/http-errors-handler');
const productsRouter = require('./components/products/product-routes');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', categoriesRouter);
app.use('/', productsRouter);

syncDatabase();
app.use(httpErrorsHandler);

app.listen(port, () => {
    console.log(`Now listening on port ${port}`); 
});