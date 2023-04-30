const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError');
const {
  DEFAULT_ERROR_CODE,
  DUPLICATE_ERROR_CODE,
} = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  if (err instanceof BadRequestError) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  } if (err instanceof UnauthorizedError) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  } if (err instanceof NotFoundError) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  } if (err.code === 11000) {
    res.status(DUPLICATE_ERROR_CODE).send({ message: 'Пользователь с данным email уже зарегистрирвоан' });
    return;
  }
  res.status(DEFAULT_ERROR_CODE).send(err);
  next();
};

module.exports = errorHandler;
