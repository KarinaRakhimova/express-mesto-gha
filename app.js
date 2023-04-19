const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
// const checkErrors = require('./utils');

const { PORT = 3000 } = process.env;
const app = express();

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', (req, res, next) => {
  req.user = {
    _id: '643ea01de2d8108f2c98c457', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});
app.use('/users', userRouter);
app.use('/cards', cardsRouter);
app.all('*', (req, res) => {
  res.status(404).send({ message: 'Указан неверный путь' });
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  dbName: 'mestodb',
});
