const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const listRouter = require('./routes/listRoutes');

const app = express();

app.use(express.json());
app.use(cookieParser);

app.use(morgan('dev'));

app.use('/api/v1/lists', listRouter);

module.exports = app;
