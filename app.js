require('dotenv').config();

const { PORT = 3001 } = process.env;
const express = require('express');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
// const cors = require('cors');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

const { cors, corsOptions } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
// app.use(cors({
//   origin: 'http://localhost:3001/',

// }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
app.use(cookieParser());
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
