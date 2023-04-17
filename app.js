const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', (req, res, next) => {
  req.user = {
    _id: '643ac61315d5147a5f0e9440', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  console.log(req.user._id);
  next();
});
app.use('/users', userRouter);
app.use('/cards', cardsRouter);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  dbName: 'mestodb',
});
