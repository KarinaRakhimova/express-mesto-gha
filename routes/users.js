const { celebrate, Joi } = require('celebrate');
const userRouter = require('express').Router();

const {
  getAllUsers,
  getCurrentUser,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

userRouter.get('/', getAllUsers);
userRouter.get('/me', getCurrentUser);
userRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
}), getUserById);

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
