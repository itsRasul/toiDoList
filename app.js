const express = require('express');
const errorController = require('./controllers/errorController');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const listRouter = require('./routes/listRoutes');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(morgan('dev'));

app.use('/api/v1/lists', listRouter);
app.use('/', (req, res, next) => {
  console.log('hey');
  res.status(200).send('jhey');
  next();
});

app.use(errorController);

module.exports = app;
