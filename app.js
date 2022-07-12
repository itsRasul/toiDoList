const express = require('express');
const errorController = require('./controllers/errorController');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const listRouter = require('./routes/listRoutes');
const taskRouter = require('./routes/taskRoutes');

const app = express();

app.use(express.json());

app.use('/api/v1/lists', listRouter);
app.use('/api/v1/tasks', taskRouter);

// error handling
app.use(errorController);

module.exports = app;
