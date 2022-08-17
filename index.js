const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Creating a new express app instance
const app = express();

// Setting up the port
const port = process.env.PORT || 5000;

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Enable CORS for all requests
app.use(cors());

// Defining a root route
app.get('/', (req, res) => {
    res.send('Welcome to LTC Patient Registration');
});

// Require the routes
app.use('/api/psychiatrist', require('./src/routes/psychiatrist'));
app.use('/api/hospital', require('./src/routes/hospital'));

// Handling errors
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
    res.status(err.statusCode).json({
        message: err.message
    });
});

// Listen for requests
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});