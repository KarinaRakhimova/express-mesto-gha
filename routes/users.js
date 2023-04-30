const { celebrate, Joi } = require('celebrate');
const userRouter = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getAllUsers,
  getUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

userRouter.get('/', getAllUsers);
userRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().required(),
  }),
}), getUser);
userRouter.get('/me', auth, getUser);
userRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
      about: Joi.string().min(2).max(30).default('Исследователь'),
      avatar: Joi.string()
        .pattern(/https?:\/\/[w{3}\.]?[\w\W]*\.[a-z\W]{2,3}#?/)
        .default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
    }),
  }),
  updateUser,
);

userRouter.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .pattern(/https?:\/\/[w{3}\.]?[\w\W]*\.[a-z\W]{2,3}#?/)
        .default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
    }),
  }),
  updateAvatar,
);

module.exports = userRouter;
