const signupRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { register } = require('../controllers/users');

signupRouter.post('/', celebrate({
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

module.exports = signupRouter;
