const {
  CAST_ERROR_CODE,
  NOTFOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
} = require('./constants');

function checkErrors(err, res) {
  if (err.name === 'ValidationError') {
    return res.status(CAST_ERROR_CODE).send({ message: 'Переданы некорректные данные ValidationError' });
  } if (err.name === 'NotFoundError') {
    return res.status(NOTFOUND_ERROR_CODE).send({ message: err.message });
  }
  if (err.name === 'CastError') {
    return res.status(CAST_ERROR_CODE).send({ message: 'Переданы некорректные данные CastError' });
  }
  return res.status(DEFAULT_ERROR_CODE).send('Произошла неизвестная ошибка на сервере');
}

module.exports = checkErrors;
