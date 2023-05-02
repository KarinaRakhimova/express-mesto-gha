require('dotenv').config();

const { PORT } = process.env;
const express = require('express');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', indexRouter);
app.use(errors());
app.use(errorHandler);
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  dbName: 'mestodb',
});
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
