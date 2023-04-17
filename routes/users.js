const userRouter = require('express').Router();
const bodyParser = require('body-parser');
const {
  getAllUsers, getUser, createUser, updateUser, updateAvatar,
} = require('../controllers/users');

userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({ extended: true }));

userRouter.get('/', getAllUsers);
userRouter.get('/:userId', getUser);
userRouter.post('/', createUser);
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateAvatar);

module.exports = userRouter;
