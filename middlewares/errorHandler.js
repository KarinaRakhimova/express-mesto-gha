const BadRequestError = require('../errors/badRequestError');
const UnauthorizedError = require('../errors/unauthorizedError');
const NotFoundError = require('../errors/notFoundError');
const {
  CAST_ERROR_CODE,
  NOTFOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
  DUPLICATE_ERROR_CODE,
} = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  if (err instanceof BadRequestError || err.name === 'ValidationError') {
    res.status(err.statusCode || CAST_ERROR_CODE).send({ message: err.message || '1Переданы некорректные данные' });
    return;
  } if (err instanceof UnauthorizedError) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  } if (err instanceof NotFoundError || err.name === 'NotFoundError') {
    res.status(err.statusCode || NOTFOUND_ERROR_CODE).send({ message: err.message || 'Запрашиваемый документ не найден' });
    return;
  } if (err.code === 11000) {
    res.status(DUPLICATE_ERROR_CODE).send({ message: 'Пользователь с данным email уже зарегистрирвоан' });
    return;
  }
  res.status(DEFAULT_ERROR_CODE).send({ message: 'На сервере произошла неизвестная ошибка' });

  next();
};

module.exports = errorHandler;
