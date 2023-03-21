'use strict';

const AuthService = require('../services/auth.service');
const catchAsync = require('../utils/catch-async.utils');

class AuthController {
  static httpRegister = catchAsync(async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;

    return res
      .status(201)
      .json(
        await AuthService.register({ name, email, password, confirmPassword })
      );
  });

  static httpLogIn = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    return res.status(200).json(await AuthService.logIn(email, password));
  });
}

module.exports = AuthController;
