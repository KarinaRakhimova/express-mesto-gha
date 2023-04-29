const express = require('express');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const auth = require('./middlewares/auth');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { NOTFOUND_ERROR_CODE } = require('./utils/constants');
const { register, login } = require('./controllers/users');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.post('/signin', login);
app.post('/signup', register);
app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardsRouter);
app.use(errors());
app.use(errorHandler);
app.all('*', (req, res) => {
  res.status(NOTFOUND_ERROR_CODE).send({ message: 'Страница не найдена' });
});
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  dbName: 'mestodb',
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
