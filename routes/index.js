const indexRouter = require('express').Router();
const signupRouter = require('./signup');
const signinRouter = require('./signin');
const userRouter = require('./users');
const cardsRouter = require('./cards');

const auth = require('../middlewares/auth');

indexRouter.use('/signup', signupRouter);
indexRouter.use('/signin', signinRouter);
indexRouter.use('/users', auth, userRouter);
indexRouter.use('/cards', auth, cardsRouter);

module.exports = indexRouter;
