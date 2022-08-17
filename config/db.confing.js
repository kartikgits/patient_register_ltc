'use strict';

const mysql = require('mysql');

// Create a connection to the database
const databaseConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

databaseConnection.connect((err) => {
    if (err) {
        console.log(err);
        throw err;
    }
    console.log('Connected to the database');
});

module.exports = databaseConnection;