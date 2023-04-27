const {
  CAST_ERROR_CODE,
  NOTFOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
  DUPLICATE_ERROR_CODE,
} = require('./constants');

function checkErrors(err, res) {
  if (err.name === 'ValidationError') {
    return res.status(CAST_ERROR_CODE).send({ message: 'Переданы некорректные данные' });
  } if (err.name === 'NotFoundError') {
    return res.status(NOTFOUND_ERROR_CODE).send({ message: err.message });
  }
  if (err.name === 'CastError') {
    return res.status(CAST_ERROR_CODE).send({ message: 'Переданы некорректные данные' });
  } if (err.code === 11000) {
    return res.status(DUPLICATE_ERROR_CODE).send('Пользователь с данным email уже зарегистрирвоан');
  }
  return res.status(DEFAULT_ERROR_CODE).send('Произошла неизвестная ошибка на сервере');
}

module.exports = checkErrors;
