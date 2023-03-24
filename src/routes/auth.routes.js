'use strict';

const express = require('express');

const AuthController = require('../controllers/auth.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');

const authRouter = express.Router();

authRouter.post('/registration', AuthController.httpRegister);
authRouter.post('/login', AuthController.httpLogIn);
authRouter.post('/forgot-password', AuthController.httpForgotPassword);
authRouter.patch(
  '/reset-password/:resetToken',
  AuthController.httpResetPassword
);
authRouter.patch(
  '/update-password',
  AuthMiddleware.protect,
  AuthController.httpUpdatePassword
);

module.exports = authRouter;
