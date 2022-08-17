const express = require('express');

const app = express();

require('./auth')(app);
require('./patientAuth')(app);

module.exports = app;