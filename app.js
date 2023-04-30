const express = require('express');
const cookieParser = require('cookie-parser');
const Joi = require('joi');
const { celebrate, errors } = require('celebrate');
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
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь'),
    avatar: Joi.string()
      .pattern(/https?:\/\/[w{3}\.]?[\w\W]*\.[a-z\W]{2,3}#?/)
      .default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
  }),
}), register);
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
