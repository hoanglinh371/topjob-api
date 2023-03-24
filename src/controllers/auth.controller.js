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

  static httpForgotPassword = catchAsync(async (req, res, next) => {
    const { protocol, host } = req;
    const { email } = req.body;

    return res
      .status(200)
      .json(await AuthService.forgotPassword(email, protocol, host));
  });

  static httpResetPassword = catchAsync(async (req, res, next) => {
    const { resetToken } = req.params;
    const { newPassword, confirmNewPassword } = req.body;

    return res
      .status(200)
      .json(
        await AuthService.resetPassword(
          newPassword,
          confirmNewPassword,
          resetToken
        )
      );
  });

  static httpUpdatePassword = catchAsync(async (req, res, next) => {
    const { user, body } = req;

    return res.status(200).json(await AuthService.updatePassword(user, body));
  });
}

module.exports = AuthController;
