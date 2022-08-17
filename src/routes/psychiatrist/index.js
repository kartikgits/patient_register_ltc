const express = require('express');

const app = express();

require('./auth')(app);
require('./psychiatrist')(app);

module.exports = app;