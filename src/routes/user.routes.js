'use strict';

const express = require('express');

const UserController = require('../controllers/user.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');

const userRouter = express.Router();

userRouter
  .route('/')
  .get(
    AuthMiddleware.protect,
    AuthMiddleware.restrictTo('admin'),
    UserController.httpGetUsers
  );

userRouter
  .route('/:_id')
  .get(UserController.httpGetUserById)
  .patch(UserController.httpUpdateUser)
  .delete(
    AuthMiddleware.protect,
    AuthMiddleware.restrictTo('admin'),
    UserController.httpDeleteUser
  );

module.exports = userRouter;
