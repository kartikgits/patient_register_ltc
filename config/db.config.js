'use strict';

const mysql = require('mysql2');

// Create a connection to the database
const databaseConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
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