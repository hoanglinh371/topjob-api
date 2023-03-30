'use strict';

const crypto = require('crypto');

const User = require('../models/user.model');
const AppError = require('../utils/app-error.util');
const EmailService = require('../services/email.service');
const { signToken } = require('../utils/token.util');

class AuthService {
  static register = async ({ name, email, password, confirmPassword }) =>
    // file
    {
      // if (!file) {
      //   throw new AppError('Please upload a image!', 400);
      // }

      const newUser = await User.create({
        name,
        email,
        password,
        confirmPassword,
        // photo_url: file.path,
      });
      const token = signToken(newUser._id);

      return {
        status: 'success',
        token,
        metadata: {
          user: newUser,
        },
      };
    };

  static logIn = async (email, password) => {
    if (!email || !password) {
      throw new AppError('Please provide email and password.', 400);
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new AppError('Email or password is incorrect.', 401);
    }
    const token = signToken(user._id);

    return {
      status: 'success',
      token,
    };
  };

  // remove protocol + host
  static forgotPassword = async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError('There is no user with email address.', 404);
    }
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // const resetUrl = `${protocol}://${hostname}:${process.env.PORT}/api/v1/auth/reset-password/${resetToken}`;
    const resetUrl = `http://localhost:3000/auth/reset-password/${resetToken}`;

    const message = `Forgot your password? ${resetUrl}`;
    const emailOptions = {
      email: user.email,
      subject: 'Your password reset token (valid for 10 mins)',
      message,
    };

    try {
      const emailService = new EmailService(emailOptions);
      await emailService.sendMail();

      return {
        status: 'success',
        message: 'Token was sent to email!',
      };
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      throw new AppError(
        'There was an error sending the email. Try again later!',
        500
      );
    }
  };

  static resetPassword = async (
    newPassword,
    confirmNewPassword,
    resetToken
  ) => {
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) {
      throw new AppError('Token is invalid or has expired.', 400);
    }

    user.password = newPassword;
    user.confirmPassword = confirmNewPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    const token = signToken(user._id);

    return {
      status: 'success',
      token,
    };
  };

  static updatePassword = async (currentUser, body) => {
    const { currentPassword, newPassword, confirmNewPassword } = body;

    const user = await User.findById(currentUser._id).select('password');
    if (!(await user.correctPassword(currentPassword, user.password))) {
      throw new AppError('Your current password is wrong.', 401);
    }
    user.password = newPassword;
    user.confirmPassword = confirmNewPassword;
    await user.save();

    const token = signToken(user._id);

    return {
      status: 'sucess',
      token,
    };
  };
}

module.exports = AuthService;
