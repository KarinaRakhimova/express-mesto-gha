require('dotenv').config();

const { PORT = 3001 } = process.env;
const express = require('express');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const allowedCors = [
  'https://api.mesto2023.students.nomoredomains.monster',
  'http://api.mesto2023.students.nomoredomains.monster',
  'http://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3000',
  'https://localhost:3001',
  'http://mesto2023.nomoredomains.monster',
  'https://mesto2023.nomoredomains.monster',
];
const app = express();
app.use(cookieParser());
app.use((req, res, next) => {

  const { host } = req.headers;
  console.log('origin', host);
  const requestHeaders = req.headers['access-control-request-headers'];
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', 'https://mesto2023.nomoredomains.monster');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  if (allowedCors.includes(host)) {
    res.header('Access-Control-Allow-Origin', host);
    res.header('Access-Control-Allow-Credentials', true);
  }
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use('/', indexRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  dbName: 'mestodb',
});
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
