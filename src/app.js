const express = require('express');
const bodyParser = require("body-parser");
const app = express();
require('dotenv').config()
const syncDatabase = require('./common/database/sequelize/schemas');
const port = 5000;
const categoriesRouter = require('./components/categories/category-routes');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get('/', (req, res) => { 
//     res.send('index.html');
                              
// });

app.use('/', categoriesRouter);

syncDatabase();

app.listen(port, () => {
    console.log(`Now listening on port ${port}`); 
});