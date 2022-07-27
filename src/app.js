const express = require('express');
const app = express();
require('dotenv').config()
const syncDatabase = require('./common/database/sequelize/schemas');
const port = 5000;


app.get('/', (req, res) => { 
    res.sendFile('index.html', {root: __dirname});
                              
});

syncDatabase();

app.listen(port, () => {
    console.log(`Now listening on port ${port}`); 
});